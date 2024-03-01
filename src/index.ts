import { DatabaseManager } from './database/database';
import { Accounts } from './database/models/accounts';
import RedisManager from './redis/redis';
import { Config } from './utils/config';
import { Webserver } from './webserver/webserver';

Config.init();
(async () => {
    await DatabaseManager.init();
    await Webserver.init();
    await RedisManager.init();
})();
