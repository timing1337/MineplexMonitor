import { Column, DataType, Index, Model, Table } from 'sequelize-typescript';

export interface AccountPunishmentsAttributes {
    id?: number;
    accountId: number;
    category: string;
    sentence: string;
    reason: string;
    time?: Date;
    duration: number;
    admin: string;
    severity: number;
    removed?: number;
    removedReason?: string;
    removedAdmin?: string;
}

@Table({ tableName: 'accountpunishments', timestamps: false })
export class AccountPunishments extends Model<AccountPunishmentsAttributes, AccountPunishmentsAttributes> implements AccountPunishmentsAttributes {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
    @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
    id?: number;
    @Column({ type: DataType.INTEGER })
    accountId!: number;
    @Column({ type: DataType.STRING(255) })
    category!: string;
    @Column({ type: DataType.STRING(255) })
    sentence!: string;
    @Column({ type: DataType.STRING(255) })
    reason!: string;
    @Column({ type: DataType.DATE, defaultValue: 'current_timestamp()' })
    time?: Date;
    @Column({ type: DataType.DOUBLE(22) })
    duration!: number;
    @Column({ type: DataType.STRING(255) })
    admin!: string;
    @Column({ type: DataType.INTEGER })
    severity!: number;
    @Column({ field: 'Removed', type: DataType.TINYINT, defaultValue: '0' })
    removed?: number;
    @Column({ field: 'RemovedReason', allowNull: true, type: DataType.STRING(255), defaultValue: 'NULL' })
    removedReason?: string;
    @Column({ field: 'RemovedAdmin', allowNull: true, type: DataType.STRING(255), defaultValue: 'NULL' })
    removedAdmin?: string;
}
