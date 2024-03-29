import { Redis } from 'ioredis';
import { Config } from '../utils/config';
import Logger from '../utils/log';
import { MinecraftServer } from './minecraft_server_data';
import { ServerGroup } from './server_group';

export default class RedisManager {
    public static instance: Redis;

    public static logger = new Logger('Redis');

    public static async init() {
        RedisManager.instance = new Redis({
            host: Config.config.redisConnection.address,
            port: Config.config.redisConnection.port
        });

        this.loadServerGroups();
    }

    public static async loadServerGroups() {
        const serverGroups = await RedisManager.instance.smembers('servergroups');
        if (serverGroups.length === 0 || !serverGroups.includes('Lobby')) {
            RedisManager.logger.log('Missing Lobby group, adding....');
            const lobby = new ServerGroup('Lobby', 'Lobby', 25700);
            lobby.arcadeGroup = false;
            lobby.maxPlayers = 50;
            RedisManager.registerServerGroup(lobby);
        }
        RedisManager.logger.log(`There are currently ${serverGroups.length} groups: ${serverGroups.join(', ')}`);
    }

    public static async getServerStatuses() {
        const serverStatuses: Map<string, MinecraftServer> = new Map<string, MinecraftServer>();
        const serverStatusKeys = await RedisManager.instance.keys('serverstatus.minecraft.US.*');
        for (const serverKey of serverStatusKeys) {
            serverStatuses.set(serverKey, JSON.parse((await RedisManager.instance.get(serverKey))!) as MinecraftServer);
        }
        return serverStatuses;
    }

    public static async getServerGroupByName(name: string): Promise<ServerGroup> {
        const serverGroupKey = `servergroups.${name}`;
        return (await RedisManager.instance.hgetall(serverGroupKey)) as unknown as ServerGroup; //insane casting LMAOOO
    }

    public static async registerServerGroup(group: ServerGroup) {
        const serverGroupKey = `servergroups.${group.name}`;

        if (await RedisManager.instance.exists(serverGroupKey)) return;

        await RedisManager.instance.sadd('servergroups', group.name);
        await RedisManager.instance.hsetnx(serverGroupKey, 'name', group.name);
        await RedisManager.instance.hsetnx(serverGroupKey, 'host', group.host);
        await RedisManager.instance.hsetnx(serverGroupKey, 'prefix', group.prefix);

        await RedisManager.instance.hsetnx(serverGroupKey, 'minPlayers', group.minPlayers);
        await RedisManager.instance.hsetnx(serverGroupKey, 'maxPlayers', group.maxPlayers);

        await RedisManager.instance.hsetnx(serverGroupKey, 'ram', group.requiredRam);
        await RedisManager.instance.hsetnx(serverGroupKey, 'cpu', group.requiredCpu);

        await RedisManager.instance.hsetnx(serverGroupKey, 'joinableServers', group.requiredJoinableServers);
        await RedisManager.instance.hsetnx(serverGroupKey, 'totalServers', group.requiredTotalServers);

        await RedisManager.instance.hsetnx(serverGroupKey, 'uptimes', group.uptimes);

        await RedisManager.instance.hsetnx(serverGroupKey, 'arcadeGroup', String(group.arcadeGroup));

        await RedisManager.instance.hsetnx(serverGroupKey, 'worldZip', group.worldZip);
        await RedisManager.instance.hsetnx(serverGroupKey, 'plugin', group.plugin);
        await RedisManager.instance.hsetnx(serverGroupKey, 'configPath', group.configPath);

        await RedisManager.instance.hsetnx(serverGroupKey, 'portSection', group.portSection);

        await RedisManager.instance.hsetnx(serverGroupKey, 'pvp', String(group.pvp));
        await RedisManager.instance.hsetnx(serverGroupKey, 'tournament', String(group.tournament));
        await RedisManager.instance.hsetnx(serverGroupKey, 'tournamentPoints', String(group.tournamentPoints));

        await RedisManager.instance.hsetnx(serverGroupKey, 'teamRejoin', String(group.teamRejoin));
        await RedisManager.instance.hsetnx(serverGroupKey, 'teamAutoJoin', String(group.teamAutoJoin));
        await RedisManager.instance.hsetnx(serverGroupKey, 'teamForceBalance', String(group.teamForceBalance));
        await RedisManager.instance.hsetnx(serverGroupKey, 'gameAutoStart', String(group.gameAutoStart));
        await RedisManager.instance.hsetnx(serverGroupKey, 'gameTimeout', String(group.gameTimeout));
        await RedisManager.instance.hsetnx(serverGroupKey, 'gameVoting', String(group.gameVoting));

        await RedisManager.instance.hsetnx(serverGroupKey, 'rewardGems', String(group.rewardGems));
        await RedisManager.instance.hsetnx(serverGroupKey, 'rewardItems', String(group.rewardItems));
        await RedisManager.instance.hsetnx(serverGroupKey, 'rewardStats', String(group.rewardStats));
        await RedisManager.instance.hsetnx(serverGroupKey, 'rewardAchievements', String(group.rewardAchievements));

        await RedisManager.instance.hsetnx(serverGroupKey, 'hotbarInventory', String(group.hotbarInventory));
        await RedisManager.instance.hsetnx(serverGroupKey, 'hotbarHubClock', String(group.hotbarHubClock));
        await RedisManager.instance.hsetnx(serverGroupKey, 'playerKickIdle', String(group.playerKickIdle));
        await RedisManager.instance.hsetnx(serverGroupKey, 'hardMaxPlayerCap', String(group.hardMaxPlayerCap));

        await RedisManager.instance.hsetnx(serverGroupKey, 'games', group.games);
        await RedisManager.instance.hsetnx(serverGroupKey, 'modes', group.modes);
        await RedisManager.instance.hsetnx(serverGroupKey, 'boosterGroup', group.boosterGroup);
        await RedisManager.instance.hsetnx(serverGroupKey, 'serverType', group.serverType);

        await RedisManager.instance.hsetnx(serverGroupKey, 'addNoCheat', String(group.addNoCheat));
        await RedisManager.instance.hsetnx(serverGroupKey, 'addWorldEdit', String(group.addWorldEdit));
        await RedisManager.instance.hsetnx(serverGroupKey, 'whitelist', String(group.whitelist));
        await RedisManager.instance.hsetnx(serverGroupKey, 'staffOnly', String(group.staffOnly));

        await RedisManager.instance.hsetnx(serverGroupKey, 'resourcePack', group.resourcePack);
        await RedisManager.instance.hsetnx(serverGroupKey, 'npcName', group.npcName);
        await RedisManager.instance.hsetnx(serverGroupKey, 'portalBottomCornerLocation', group.portalBottomCornerLocation);
        await RedisManager.instance.hsetnx(serverGroupKey, 'portalTopCornerLocation', group.portalTopCornerLocation);
        await RedisManager.instance.hsetnx(serverGroupKey, 'teamServerKey', group.teamServerKey);
        await RedisManager.instance.hsetnx(serverGroupKey, 'region', group.region);
    }
}
