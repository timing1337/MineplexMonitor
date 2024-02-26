import Server from 'mysql2/typings/mysql/lib/Server';
import { DatabaseManager } from './database/database';
import RedisManager from './redis/redis';
import { ServerGroup } from './redis/server/server_group';
import { Config } from './utils/config';
import { Webserver } from './webserver/webserver';

Config.init();
(async () => {
    await DatabaseManager.init();
    await Webserver.init();
    await RedisManager.init();
})();
