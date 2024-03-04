export type MinecraftServer = {
    _name: string;
    _group: string;
    _motd: string;
    _playerCount: number;
    _maxPlayerCount: number;
    _tps: number;
    _ram: number;
    _maxRam: number;
    _publicAddress: string;
    _port: number;
    _donorsOnline: number;
    _startUpDate: string; //keep these as string!
    _currentTime: string;
};

export class DedicatedServer {
    constructor(public name: string, public publicAddress: string, public privateAddress: string, public region: string, public availableCpu: string, public availableRam: string, public maxCpu: string, public maxRam: string) {}
}

export enum Region {
    US = 'US',
    EU = 'EU'
}
