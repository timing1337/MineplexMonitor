import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

export interface AccountTransactionsAttributes {
    id?: number;
    accountId: number;
    date?: Date;
    salesPackageName: string;
    gems: number;
    coins: number;
}

@Table({ tableName: "accounttransactions", timestamps: false })
export class AccountTransactions extends Model<AccountTransactionsAttributes, AccountTransactionsAttributes> implements AccountTransactionsAttributes {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ type: DataType.INTEGER })
    accountId!: number;
    @Column({ type: DataType.DATE, defaultValue: "current_timestamp()" })
    date?: Date;
    @Column({ type: DataType.STRING })
    salesPackageName!: string;
    @Column({ type: DataType.INTEGER })
    gems!: number;
    @Column({ type: DataType.INTEGER })
    coins!: number;
}