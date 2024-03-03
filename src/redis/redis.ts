import { Redis } from 'ioredis';
import { Config } from '../utils/config';
import Logger from '../utils/log';
import { ServerGroupPrefix } from './server/server_group';

type ServerStatus = {
    totalServers: number;
    availableServers: number;
};

export default class RedisManager {
    public static instance: Redis;

    public static logger = new Logger('Redis');

    public static async init() {
        RedisManager.instance = new Redis({
            host: Config.config.redisConnection.address,
            port: Config.config.redisConnection.port,
            password: Config.config.redisConnection.password
        });

        this.loadServerGroups();
        this.initServerStatus();
    }

    //Manually update totalServers/joinableServer Status
    //Ideally you wouldnt have to do this if you have ServerMonitor
    //TODO: Implement the same thing :yay!
    public static async initServerStatus() {
        var doServersCheck = async function () {
            const serverStatuses: Map<string, ServerStatus> = new Map<string, ServerStatus>();
            const serverStatusKeys = await RedisManager.instance.keys('serverstatus.minecraft.US.*');
            for (const serverKey of serverStatusKeys) {
                const serverStatus = JSON.parse((await RedisManager.instance.get(serverKey))!);
                if (serverStatus['_tps'] == 0) {
                    //server died, might as well delete this.
                    await RedisManager.instance.del(serverKey);
                    continue;
                }
                const serverGroup = serverStatus['_group'];
                if (!serverStatuses.has(serverGroup)) {
                    serverStatuses.set(serverGroup, {
                        availableServers: 0,
                        totalServers: 0
                    });
                }
                serverStatuses.get(serverGroup)!.totalServers++;
                if (serverStatus['_playerCount'] < serverStatus['_maxPlayerCount']) serverStatuses.get(serverGroup)!.availableServers++;
            }
            serverStatuses.forEach(async (status, key) => {
                await RedisManager.instance.hset(`servergroups.${key}`, 'totalServers', status.totalServers);
                await RedisManager.instance.hset(`servergroups.${key}`, 'joinableServers', status.availableServers);
            });
            setTimeout(doServersCheck, 1000);
        };
        doServersCheck();
    }

    public static async loadServerGroups() {
        const serverGroups = await RedisManager.instance.smembers('servergroups');
        if (serverGroups.length === 0 || !serverGroups.includes('Lobby')) {
            await RedisManager.initializeServerGroup('Lobby');
            serverGroups.push(ServerGroupPrefix.Lobby);
            await RedisManager.initializeServerGroup('MicroBattles', 'Micro Battles', 'Micro');
            serverGroups.push(ServerGroupPrefix.MicroBattles);
            RedisManager.logger.log('Missing Lobby group, adding....');
        }
        RedisManager.logger.log(`There are currently ${serverGroups.length} groups: ${serverGroups.join(', ')}`);
    }

    public static async initializeServerGroup(name: string, npcName: string = '', gameRotation: string = name) {
        const serverGroupKey = `servergroups.${name}`;

        if (await RedisManager.instance.exists(serverGroupKey)) return;

        const isArcade = !(name.includes('Lobby') || name.includes('Hub')); //Safe to assume this i guess
        const startingGroupPort = 25600 + (await RedisManager.instance.scard('servergroups')) * 100; //with this way of doing, you'll prob have 100 servers max for each group, ig thats fair...?

        await RedisManager.instance.sadd('servergroups', name);
        await RedisManager.instance.hsetnx(serverGroupKey, 'name', name);
        await RedisManager.instance.hsetnx(serverGroupKey, 'prefix', ServerGroupPrefix[name as keyof typeof ServerGroupPrefix] ?? name);
        await RedisManager.instance.hsetnx(serverGroupKey, 'ram', 512); //TODO: ehm stop hardcoding this waaawa
        await RedisManager.instance.hsetnx(serverGroupKey, 'cpu', 1);
        await RedisManager.instance.hsetnx(serverGroupKey, 'totalServers', 0);
        await RedisManager.instance.hsetnx(serverGroupKey, 'joinableServers', 0);
        await RedisManager.instance.hsetnx(serverGroupKey, 'portSection', startingGroupPort);
        await RedisManager.instance.hsetnx(serverGroupKey, 'minPlayers', 1); //TODO: ehm stop hardcoding this waaawa
        await RedisManager.instance.hsetnx(serverGroupKey, 'maxPlayers', isArcade ? 16 : 50); //Default values for arcade and hub
        await RedisManager.instance.hsetnx(serverGroupKey, 'pvp', String(isArcade)); //dumbassery
        await RedisManager.instance.hsetnx(serverGroupKey, 'serverType', isArcade ? 'Minigames' : 'dedicated');
        await RedisManager.instance.hsetnx(serverGroupKey, 'addNoCheat', 'true');
        await RedisManager.instance.hsetnx(serverGroupKey, 'addWorldEdit', 'false');
        if (npcName !== '') await RedisManager.instance.hsetnx(serverGroupKey, 'npcName', npcName);

        if (isArcade) {
            await RedisManager.instance.hsetnx(serverGroupKey, 'tournament', 'false');
            await RedisManager.instance.hsetnx(serverGroupKey, 'tournamentPoints', 'false');
            await RedisManager.instance.hsetnx(serverGroupKey, 'teamRejoin', 'false');
            await RedisManager.instance.hsetnx(serverGroupKey, 'teamAutoJoin', 'true');
            await RedisManager.instance.hsetnx(serverGroupKey, 'teamForceBalance', 'true');
            await RedisManager.instance.hsetnx(serverGroupKey, 'gameAutoStart', 'true');
            await RedisManager.instance.hsetnx(serverGroupKey, 'gameTimeout', 'false');
            await RedisManager.instance.hsetnx(serverGroupKey, 'rewardGems', 'true');
            await RedisManager.instance.hsetnx(serverGroupKey, 'rewardItems', 'true');
            await RedisManager.instance.hsetnx(serverGroupKey, 'rewardStats', 'true');
            await RedisManager.instance.hsetnx(serverGroupKey, 'rewardAchievements', 'true');
            await RedisManager.instance.hsetnx(serverGroupKey, 'hotbarInventory', 'true');
            await RedisManager.instance.hsetnx(serverGroupKey, 'hotbarHubClock', 'true');
            await RedisManager.instance.hsetnx(serverGroupKey, 'playerKickIdle', 'true');
            await RedisManager.instance.hsetnx(serverGroupKey, 'worldZip', 'arcade.zip');
            await RedisManager.instance.hsetnx(serverGroupKey, 'configPath', 'plugins/Arcade');
            await RedisManager.instance.hsetnx(serverGroupKey, 'plugin', 'Arcade.jar');
            await RedisManager.instance.hsetnx(serverGroupKey, 'games', gameRotation);
        }
    }
}
