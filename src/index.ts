import { DatabaseManager } from './database/database';
import { Config } from './utils/config';
import { Webserver } from './webserver/webserver';

Config.init();
(async () => {
    await DatabaseManager.init();
    await Webserver.init();
})();
