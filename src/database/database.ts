import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Config } from '../utils/config';
import Logger from '../utils/log';
import { Account, AccountPunishment, AccountRank } from './models/accounts';
import { AccountToken } from '../webserver/token/account';
import { PunishToken, PunishmentToken } from '../webserver/token/punish';

export class DatabaseManager {
    private static sequelize: Sequelize;
    public static readonly logger: Logger = new Logger('Database');

    public static async init() {
        const databaseConnectionConfig = Config.config.databaseConnection;
        this.sequelize = new Sequelize({
            host: databaseConnectionConfig.address,
            port: databaseConnectionConfig.port,
            username: databaseConnectionConfig.username,
            password: databaseConnectionConfig.password,
            dialect: 'mysql',
            models: [Account, AccountPunishment, AccountRank],
            database: 'account',
            logging: false
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

    public static async getAccountNamesMatching(match: string): Promise<string[]> {
        const accounts = await Account.findAll({
            where: {
                name: { [Op.like]: `%${match}%` }
            },
            order: [['lastLogin', 'DESC']]
        });
        return accounts.map((account) => account.name);
    }

    public static async getAccountByName(name: string): Promise<Account | undefined> {
        const account = await Account.findAll({
            where: {
                name: name
            }
        });
        if (account.length < 1) {
            return;
        }
        return account[0];
    }

    public static async getAccountByUUID(uuid: string): Promise<Account | undefined> {
        const account = await Account.findAll({
            where: {
                uuid: uuid
            }
        });
        if (account.length == 0) {
            return;
        }
        return account[0];
    }

    //TODO: Caching...?
    public static async getAccountToken(account: Account) {
        const accountToken: AccountToken = {
            AccountId: account.id,
            Name: account.name,
            Rank: 'PLAYER', //Defaulted
            Time: Date.now(),
            Punishments: [],
            DonorToken: {
                Gems: account.gems,
                Coins: account.coins,
                Donated: false,
                SalesPackages: [],
                UnknownSalesPackages: [],
                Transactions: [],
                CoinRewards: [],
                CustomBuilds: [],
                Pets: [],
                PetNameTagCount: 0
            }
        };

        //LoadRank
        const accountRank = await AccountRank.findAll({
            where: {
                accountId: account.id
            }
        });

        if (accountRank.length > 0) {
            accountToken.Rank = accountRank[0].rankIdentifier;
        }

        //Load Punishment

        const punishClient = await DatabaseManager.getPunishClient(account);
        accountToken.Punishments = punishClient.Punishments;
        accountToken.Time = punishClient.Time;

        return accountToken;
    }

    public static async getPunishClient(account: Account): Promise<PunishToken> {
        const punishToken: PunishToken = {
            Name: account.name,
            Time: Date.now(),
            Punishments: []
        };

        const punishments = await AccountPunishment.findAll({
            where: {
                accountId: account.id
            }
        });

        if (punishments.length > 0) {
            punishToken.Punishments = punishments.map((punishment) => {
                let isActive = punishment.duration < 0 /* is perm */ || Date.now() < punishment.time.getTime() + punishment.duration * 60 * 60 * 3600; /* is expired */
                if (punishment.removed) {
                    isActive = false;
                }
                return {
                    PunishmentId: punishment.id,
                    Admin: punishment.admin,
                    Time: punishment.time.getTime(),
                    Sentence: punishment.sentence,
                    Category: punishment.category,
                    Reason: punishment.reason,
                    Severity: punishment.severity,
                    Duration: punishment.duration,
                    Active: isActive,
                    Removed: punishment.removed,
                    RemoveAdmin: punishment.removedAdmin,
                    RemoveReason: punishment.removedReason
                } as PunishmentToken;
            });
        }
        return punishToken;
    }
}
