import CommandManager from './command/command_manager';
import { DatabaseManager } from './database/database';
import RedisManager from './redis/redis';
import { Config } from './utils/config';
import { Webserver } from './webserver/webserver';

Config.init();
(async () => {
    await DatabaseManager.init();
    await Webserver.init();
    await RedisManager.init();
    await CommandManager.init();
})();
