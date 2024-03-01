import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface AccountPunishmentsAttributes {
    id: number;
    accountId: number;
    category: string;
    sentence: string;
    reason: string;
    time: Date;
    duration: number;
    admin: string;
    severity: number;
    removed: number;
    removedReason?: string;
    removedAdmin?: string;
}

export type AccountPunishmentsPk = 'id';
export type AccountPunishmentsId = AccountPunishments[AccountPunishmentsPk];
export type AccountPunishmentsOptionalAttributes = 'id' | 'time' | 'removed' | 'removedReason' | 'removedAdmin';
export type AccountPunishmentsCreationAttributes = Optional<AccountPunishmentsAttributes, AccountPunishmentsOptionalAttributes>;

export class AccountPunishments extends Model<AccountPunishmentsAttributes, AccountPunishmentsCreationAttributes> implements AccountPunishmentsAttributes {
    id!: number;
    accountId!: number;
    category!: string;
    sentence!: string;
    reason!: string;
    time!: Date;
    duration!: number;
    admin!: string;
    severity!: number;
    removed!: number;
    removedReason?: string;
    removedAdmin?: string;

    static initModel(sequelize: Sequelize.Sequelize): typeof AccountPunishments {
        return sequelize.define(
            'AccountPunishments',
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
                category: {
                    type: DataTypes.STRING(255),
                    allowNull: false
                },
                sentence: {
                    type: DataTypes.STRING(255),
                    allowNull: false
                },
                reason: {
                    type: DataTypes.STRING(255),
                    allowNull: false
                },
                time: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.Sequelize.fn('current_timestamp')
                },
                duration: {
                    type: DataTypes.DOUBLE,
                    allowNull: false
                },
                admin: {
                    type: DataTypes.STRING(255),
                    allowNull: false
                },
                severity: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                removed: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: 0,
                    field: 'Removed'
                },
                removedReason: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                    field: 'RemovedReason'
                },
                removedAdmin: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                    field: 'RemovedAdmin'
                }
            },
            {
                tableName: 'accountpunishments',
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
        ) as typeof AccountPunishments;
    }
}
