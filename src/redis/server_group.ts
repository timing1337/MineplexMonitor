import { Region } from './minecraft_server_data';

export enum ServerGroupPrefix {
    Lobby = 'Lobby',
    MasterBuilders = 'BLD',
    DrawMyThing = 'DMT',
    MicroBattles = 'MB',
    MixedArcade = 'MIN',
    TurfWars = 'TF',
    SpeedBuilders = 'SB',
    BlockHunt = 'BH',
    CakeWars2 = 'CW2',
    CakeWars4 = 'CW4',
    SurvivalGamesSolo = 'HG',
    SurvivalGamesTeams = 'SG2', //??? Might not be teams
    SkywarsSolo = 'SKY',
    SkywarsTeams = 'SKY2',
    Bridges = 'BR',
    MineStrike = 'MS',
    SSM = 'MS',
    SSM2 = 'SSM2',
    ChampionsDomination = 'DOM',
    ChampionsCaptureTheFlag = 'CTF',
    //Clans
    //Retro
    //Nano
    NanoGames = 'NANO'
}

export class ServerGroup {
    constructor(public name: string, public prefix: string, public host: string = '', public minPlayers: number = 0, public maxPlayers: number = 16, public requiredRam: number = 2048, public requiredCpu: number = 2, public requiredTotalServers: number = 1, public requiredJoinableServers: number = 1, public uptimes: string = '', public arcadeGroup: boolean, public worldZip: string = '', public plugin: string = '', public configPath: string = '', public portSection: number, public pvp: boolean = false, public tournament: boolean = false, public tournamentPoints: boolean = false, public teamRejoin: boolean = false, public teamAutoJoin: boolean = false, public teamForceBalance: boolean = false, public gameAutoStart: boolean = false, public gameTimeout: boolean = false, public gameVoting: boolean = false, public mapVoting: boolean = false, public rewardGems: boolean = false, public rewardItems: boolean = false, public rewardStats: boolean = false, public rewardAchievements: boolean = false, public hotbarInventory: boolean = false, public hotbarHubClock: boolean = false, public playerKickIdle: boolean = false, public hardMaxPlayerCap: boolean = false, public games: string = '', public modes: string = '', public boosterGroup: string = '', public serverType: string = '', public addNoCheat: boolean = false, public addWorldEdit: boolean = false, public whitelist: boolean = false, public staffOnly: boolean = false, public resourcePack: string = '', public npcName: string = '', public portalBottomCornerLocation: string = '', public portalTopCornerLocation: string = '', public teamServerKey: string = '', public region: string = Region.US) {}
}
