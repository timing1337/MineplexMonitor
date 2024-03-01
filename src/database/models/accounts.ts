import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

export interface AccountsAttributes {
    id?: number;
    uuid: string;
    name: string;
    gems?: number;
    coins?: number;
    lastLogin?: string;
    totalPlayTime?: string;
}

@Table({ tableName: "accounts", timestamps: false })
export class Accounts extends Model<AccountsAttributes, AccountsAttributes> implements AccountsAttributes {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ type: DataType.STRING(100) })
    @Index({ name: "uuidIndex", using: "BTREE", order: "ASC", unique: true })
    uuid!: string;
    @Column({ type: DataType.STRING(40) })
    @Index({ name: "nameIndex", using: "BTREE", order: "ASC", unique: true })
    name!: string;
    @Column({ type: DataType.INTEGER, defaultValue: "0" })
    gems?: number;
    @Column({ type: DataType.INTEGER, defaultValue: "0" })
    coins?: number;
    @Column({ allowNull: true, type: DataType.STRING, defaultValue: "NULL" })
    lastLogin?: string;
    @Column({ allowNull: true, type: DataType.STRING, defaultValue: "NULL" })
    totalPlayTime?: string;
}