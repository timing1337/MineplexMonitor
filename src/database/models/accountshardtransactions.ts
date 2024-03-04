import { Column, DataType, Index, Model, Table } from 'sequelize-typescript';

export interface AccountShardTransactionsAttributes {
    id?: number;
    accountId: number;
    source: string;
    amount: number;
    date?: Date;
}

@Table({ tableName: 'accountshardtransactions', timestamps: false })
export class AccountShardTransactions extends Model<AccountShardTransactionsAttributes, AccountShardTransactionsAttributes> implements AccountShardTransactionsAttributes {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
    @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
    id?: number;
    @Column({ type: DataType.INTEGER })
    accountId!: number;
    @Column({ type: DataType.STRING(40) })
    source!: string;
    @Column({ type: DataType.INTEGER })
    amount!: number;
    @Column({ type: DataType.DATE, defaultValue: 'current_timestamp()' })
    date?: Date;
}
