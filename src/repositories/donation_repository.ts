import { Accounts } from '../database/models/accounts';
import { AccountShardTransactions } from '../database/models/accountshardtransactions';
import { AccountTransactions } from '../database/models/accounttransactions';
import { CurrencyRewardToken, UnknownPurchaseToken } from '../webserver/token/donor';
import AccountRepository from './account_repository';

export enum TransactionResponse {
    InsufficientFunds = 'InsufficientFunds',
    Failed = 'Failed',
    Success = 'Success',
    AlreadyOwns = 'AlreadyOwns'
}

export default class DonationRepository {
    public static async purchaseUnknownSalesPackage(token: UnknownPurchaseToken): Promise<TransactionResponse> {
        const account = await AccountRepository.getAccountByName(token.AccountName);
        if (!account) return TransactionResponse.Failed;

        const balance = token.CoinPurchase ? account.coins! : account.gems!;
        if (balance < token.Cost) return TransactionResponse.InsufficientFunds;

        await AccountTransactions.create({
            accountId: account.id!,
            coins: token.CoinPurchase ? token.Cost : 0,
            gems: token.CoinPurchase ? 0 : token.Cost,
            salesPackageName: token.SalesPackageName,
            date: new Date()
        });

        if (token.CoinPurchase) {
            await Accounts.update(
                {
                    coins: account.coins! - token.Cost
                },
                {
                    where: {
                        uuid: account.uuid
                    }
                }
            );
        } else {
            await Accounts.update(
                {
                    coins: account.gems! - token.Cost
                },
                {
                    where: {
                        uuid: account.uuid
                    }
                }
            );
        }

        return TransactionResponse.Success;
    }

    public static async RewardCoins(token: CurrencyRewardToken): Promise<boolean> {
        const account = await AccountRepository.getAccountByName(token.Name);
        if (!account) return false;
        if (token.Amount < 0) return false;

        await Accounts.update(
            {
                coins: account.coins! + token.Amount
            },
            {
                where: {
                    uuid: account.uuid
                }
            }
        );

        await AccountShardTransactions.create({
            accountId: account.id!,
            source: token.Source,
            amount: token.Amount,
            date: new Date()
        });

        return true;
    }
    public static async RewardGems(token: CurrencyRewardToken): Promise<boolean> {
        const account = await AccountRepository.getAccountByName(token.Name);
        if (!account || token.Amount < 0) return false;

        await Accounts.update(
            {
                gems: account.gems! + token.Amount
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
