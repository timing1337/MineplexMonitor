import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface AccountsAttributes {
    id: number;
    uuid: string;
    name: string;
    gems?: number;
    coins: number;
    lastLogin?: string;
    totalPlayTime?: string;
}

export type AccountsPk = 'id';
export type AccountsId = Accounts[AccountsPk];
export type AccountsOptionalAttributes = 'id' | 'gems' | 'coins' | 'lastLogin' | 'totalPlayTime';
export type AccountsCreationAttributes = Optional<AccountsAttributes, AccountsOptionalAttributes>;

export class Accounts extends Model<AccountsAttributes, AccountsCreationAttributes> implements AccountsAttributes {
    id!: number;
    uuid!: string;
    name!: string;
    gems!: number;
    coins!: number;
    lastLogin?: string;
    totalPlayTime?: string;

    static initModel(sequelize: Sequelize.Sequelize): typeof Accounts {
        return sequelize.define(
            'Accounts',
            {
                id: {
                    autoIncrement: true,
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true
                },
                uuid: {
                    type: DataTypes.STRING(100),
                    allowNull: false,
                    unique: 'uuidIndex'
                },
                name: {
                    type: DataTypes.STRING(40),
                    allowNull: false,
                    unique: 'nameIndex'
                },
                gems: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                },
                coins: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                },
                lastLogin: {
                    type: DataTypes.TEXT,
                    allowNull: true
                },
                totalPlayTime: {
                    type: DataTypes.TEXT,
                    allowNull: true
                }
            },
            {
                tableName: 'accounts',
                timestamps: false,
                indexes: [
                    {
                        name: 'PRIMARY',
                        unique: true,
                        using: 'BTREE',
                        fields: [{ name: 'id' }]
                    },
                    {
                        name: 'uuidIndex',
                        unique: true,
                        using: 'BTREE',
                        fields: [{ name: 'uuid' }]
                    },
                    {
                        name: 'nameIndex',
                        unique: true,
                        using: 'BTREE',
                        fields: [{ name: 'name' }]
                    }
                ]
            }
        ) as typeof Accounts;
    }
}
