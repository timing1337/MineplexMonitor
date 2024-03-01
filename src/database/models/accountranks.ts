import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

export interface AccountRanksAttributes {
    id?: number;
    accountId: number;
    rankIdentifier?: string;
    primaryGroup?: number;
}

@Table({ tableName: "accountranks", timestamps: false })
export class AccountRanks extends Model<AccountRanksAttributes, AccountRanksAttributes> implements AccountRanksAttributes {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ type: DataType.INTEGER })
    @Index({ name: "additionalIndex", using: "BTREE", order: "ASC", unique: true })
    @Index({ name: "accountIndex", using: "BTREE", order: "ASC", unique: false })
    accountId!: number;
    @Column({ allowNull: true, type: DataType.STRING(40), defaultValue: "'PLAYER'" })
    @Index({ name: "additionalIndex", using: "BTREE", order: "ASC", unique: true })
    @Index({ name: "rankIndex", using: "BTREE", order: "ASC", unique: false })
    rankIdentifier?: string;
    @Column({ allowNull: true, type: DataType.TINYINT, defaultValue: "1" })
    @Index({ name: "additionalIndex", using: "BTREE", order: "ASC", unique: true })
    primaryGroup?: number;
}