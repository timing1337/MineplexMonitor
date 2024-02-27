export type DonorToken = {
    Gems: number;
    Coins: number;
    Donated: boolean;
    SalesPackages: number[];
    UnknownSalesPackages: string[];
    Transactions: AccountTransactionToken[];
    CoinRewards: CoinTransactionToken[];
    //TODO: Custom Builds
    CustomBuilds: CustomBuildToken[];
    Pets: PetToken[];
    PetNameTagCount: number;
};

export type UnknownPurchaseToken = {
    AccountName: string;
    SalesPackageName: string;
    CoinPurchase: boolean;
    Cost: number;
    Premium: boolean;
};

export type AccountTransactionToken = {
    Date: string;
    SalesPackageName: string;
    Gems: number;
    Coins: number;
};

export type CoinTransactionToken = {
    Date: string;
    Source: string;
    Amount: number;
};

export type CustomBuildToken = {};

export type PetToken = {
    PetName: string;
    PetType: string;
};