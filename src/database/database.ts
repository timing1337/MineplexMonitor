import { ModelCtor, Sequelize } from 'sequelize-typescript';
import { Config } from '../utils/config';
import Logger from '../utils/log';
import { Accounts } from './models/accounts';
import { AccountPunishments } from './models/accountpunishments';
import { AccountRanks } from './models/accountranks';
import { AccountShardTransactions } from './models/accountshardtransactions';
import { AccountTransactions } from './models/accounttransactions';

export class DatabaseManager {
    public static sequelize: Sequelize;
    public static readonly logger: Logger = new Logger('Database');

    public static async init() {
        const databaseConnectionConfig = Config.config.databaseConnection;
        this.sequelize = new Sequelize({
            host: databaseConnectionConfig.address,
            port: databaseConnectionConfig.port,
            username: databaseConnectionConfig.username,
            password: databaseConnectionConfig.password,
            dialect: 'mysql',
            database: 'account',
            logging: false,
            models: [Accounts, AccountPunishments, AccountRanks, AccountShardTransactions, AccountTransactions]
        });

        try {
            await this.sequelize.authenticate();
            DatabaseManager.logger.log(`Successfully connected to ${databaseConnectionConfig.address}:${databaseConnectionConfig.port} as ${databaseConnectionConfig.username}`);
        } catch (ex) {
            DatabaseManager.logger.log(`There was an issue connecting to ${databaseConnectionConfig.address}:${databaseConnectionConfig.port}. Shutting down...`);
            DatabaseManager.logger.error(ex);
            process.exit(0);
        }
    }
}