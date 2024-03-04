import { Op } from 'sequelize';
import { AccountRanks } from '../database/models/accountranks';
import { Accounts } from '../database/models/accounts';
import { AccountShardTransactions } from '../database/models/accountshardtransactions';
import { AccountTransactions } from '../database/models/accounttransactions';
import { AccountToken } from '../webserver/token/account';
import PunishmentRepository from './punishment_repository';

export default class AccountRepository {
    public static async getAccountNamesMatching(match: string): Promise<string[]> {
        const accounts = await Accounts.findAll({
            where: {
                name: { [Op.like]: `%${match}%` }
            },
            order: [['lastLogin', 'DESC']]
        });
        return accounts.map((account) => account.name);
    }

    public static async getAccountByName(name: string): Promise<Accounts | undefined> {
        const account = await Accounts.findAll({
            where: {
                name: name
            }
        });
        if (account.length < 1) {
            return;
        }
        return account[0];
    }

    public static async getAccountByUUID(uuid: string): Promise<Accounts | undefined> {
        const account = await Accounts.findAll({
            where: {
                uuid: uuid
            }
        });
        if (account.length == 0) {
            return;
        }
        return account[0];
    }

    public static async getAccountToken(account: Accounts) {
        const accountToken: AccountToken = {
            AccountId: account.id!,
            Name: account.name,
            Rank: (await AccountRanks.findAll({ where: { accountId: account.id } })).find((rank) => rank.primaryGroup == 1)?.rankIdentifier ?? 'PLAYER',
            Time: Date.now(),
            Punishments: [],
            DonorToken: {
                Gems: account.gems!,
                Coins: account.coins!,
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

        const coinsTransactions = await AccountShardTransactions.findAll({ where: { accountId: account.id } });
        for (const coinTransaction of coinsTransactions) {
            accountToken.DonorToken.CoinRewards.push({
                Amount: coinTransaction.amount,
                Date: coinTransaction.date!.getTime().toString(), //?? no idea how they parse them
                Source: coinTransaction.source
            });
        }

        const unknownPackageTransactions = await AccountTransactions.findAll({ where: { accountId: account.id } });
        for (const unknownPackageTransaction of unknownPackageTransactions) {
            accountToken.DonorToken.UnknownSalesPackages.push(unknownPackageTransaction.salesPackageName);
            accountToken.DonorToken.Transactions.push({
                SalesPackageName: unknownPackageTransaction.salesPackageName,
                Date: unknownPackageTransaction.date!.getTime().toString(),
                Gems: unknownPackageTransaction.gems,
                Coins: unknownPackageTransaction.coins
            });
        }

        const punishClient = await PunishmentRepository.getPunishClient(account);
        accountToken.Punishments = punishClient.Punishments;

        return accountToken;
    }
}
