import { Accounts } from '../database/models/accounts';
import { AccountShardTransactions } from '../database/models/accountshardtransactions';
import AccountRepository from './account_repository';

export enum TransactionResponse {
    InsufficientFunds = 'InsufficientFunds',
    Failed = 'Failed',
    Success = 'Success',
    AlreadyOwns = 'AlreadyOwns'
}

export default class DonationRepository {
    public static async RewardCoins(name: string, amount: number, source: string = ''): Promise<boolean> {
        const account = await AccountRepository.getAccountByName(name);
        if (!account) return false;
        if (amount < 0) return false;

        await Accounts.update(
            {
                coins: account.coins + amount
            },
            {
                where: {
                    uuid: account.uuid
                }
            }
        );

        await AccountShardTransactions.create({
            accountId: account.id,
            source: source,
            amount: amount
        });

        return true;
    }
    public static async RewardGems(name: string, amount: number, source: string = ''): Promise<boolean> {
        const account = await AccountRepository.getAccountByName(name);
        if (!account) return false;
        if (amount < 0) return false;
        await Accounts.update(
            {
                gems: account.gems + amount
            },
            {
                where: {
                    uuid: account.uuid
                }
            }
        );

        //Mineplex doens't save these so idk tbh....
        //TODO: Gems shard transaction.
        return true;
    }
}
