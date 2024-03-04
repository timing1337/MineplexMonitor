//Basically a minimal port of the original ServerMonitor but with windows support!

import RedisManager from '../redis/redis';

export default class ServerMonitor {
    public static init() {
        const totalPlayers = 0;
        const serverStatuses = RedisManager.getServerStatuses();
    }
}
