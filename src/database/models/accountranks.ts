import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface AccountRanksAttributes {
    id: number;
    accountId: number;
    rankIdentifier?: string;
    primaryGroup?: number;
}

export type AccountRanksPk = 'id';
export type AccountRanksId = AccountRanks[AccountRanksPk];
export type AccountRanksOptionalAttributes = 'id' | 'rankIdentifier' | 'primaryGroup';
export type AccountRanksCreationAttributes = Optional<AccountRanksAttributes, AccountRanksOptionalAttributes>;

export class AccountRanks extends Model<AccountRanksAttributes, AccountRanksCreationAttributes> implements AccountRanksAttributes {
    id!: number;
    accountId!: number;
    rankIdentifier?: string;
    primaryGroup?: number;

    static initModel(sequelize: Sequelize.Sequelize): typeof AccountRanks {
        return sequelize.define(
            'AccountRanks',
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
                rankIdentifier: {
                    type: DataTypes.STRING(40),
                    allowNull: true,
                    defaultValue: 'PLAYER'
                },
                primaryGroup: {
                    type: DataTypes.BOOLEAN,
                    allowNull: true,
                    defaultValue: 1
                }
            },
            {
                tableName: 'accountranks',
                timestamps: false,
                indexes: [
                    {
                        name: 'PRIMARY',
                        unique: true,
                        using: 'BTREE',
                        fields: [{ name: 'id' }]
                    },
                    {
                        name: 'additionalIndex',
                        unique: true,
                        using: 'BTREE',
                        fields: [{ name: 'accountId' }, { name: 'rankIdentifier' }, { name: 'primaryGroup' }]
                    },
                    {
                        name: 'accountIndex',
                        using: 'BTREE',
                        fields: [{ name: 'accountId' }]
                    },
                    {
                        name: 'rankIndex',
                        using: 'BTREE',
                        fields: [{ name: 'rankIdentifier' }]
                    }
                ]
            }
        ) as typeof AccountRanks;
    }
}
