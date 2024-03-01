import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface AccountShardTransactionsAttributes {
    id: number;
    accountId: number;
    source: string;
    amount: number;
    date: Date;
}

export type AccountShardTransactionsPk = 'id';
export type AccountShardTransactionsId = AccountShardTransactions[AccountShardTransactionsPk];
export type AccountShardTransactionsOptionalAttributes = 'id' | 'date';
export type AccountShardTransactionsCreationAttributes = Optional<AccountShardTransactionsAttributes, AccountShardTransactionsOptionalAttributes>;

export class AccountShardTransactions extends Model<AccountShardTransactionsAttributes, AccountShardTransactionsCreationAttributes> implements AccountShardTransactionsAttributes {
    id!: number;
    accountId!: number;
    source!: string;
    amount!: number;
    date!: Date;

    static initModel(sequelize: Sequelize.Sequelize): typeof AccountShardTransactions {
        return sequelize.define(
            'AccountShardTransactions',
            {
                id: {
                    autoIncrement: true,
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true
                },
                accountId: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                source: {
                    type: DataTypes.STRING(40),
                    allowNull: false
                },
                amount: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                date: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.Sequelize.fn('current_timestamp')
                }
            },
            {
                tableName: 'accountshardtransactions',
                timestamps: false,
                indexes: [
                    {
                        name: 'PRIMARY',
                        unique: true,
                        using: 'BTREE',
                        fields: [{ name: 'id' }]
                    }
                ]
            }
        ) as typeof AccountShardTransactions;
    }
}
