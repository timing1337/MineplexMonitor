import { Column, DataType, Index, Model, Table } from 'sequelize-typescript';

export interface BungeeStatsAttributes {
    id?: number;
    address?: string;
    updated?: string;
    players?: number;
    maxPlayers?: number;
    alive: number;
    online: number;
    us?: number;
}

@Table({ tableName: 'bungeestats', timestamps: false })
export class BungeeStats extends Model<BungeeStatsAttributes, BungeeStatsAttributes> implements BungeeStatsAttributes {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
    @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.STRING(25), defaultValue: 'NULL' })
    address?: string;
    @Column({ allowNull: true, type: DataType.STRING, defaultValue: 'NULL' })
    updated?: string;
    @Column({ allowNull: true, type: DataType.INTEGER, defaultValue: 'NULL' })
    players?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, defaultValue: 'NULL' })
    maxPlayers?: number;
    @Column({ type: DataType.TINYINT })
    alive!: number;
    @Column({ type: DataType.TINYINT })
    online!: number;
    @Column({ field: 'US', type: DataType.TINYINT, defaultValue: '1' })
    us?: number;
}
