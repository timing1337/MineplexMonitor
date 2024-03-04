import { Column, DataType, Index, Model, Table } from 'sequelize-typescript';

export interface DedicatedServerStatsAttributes {
    id?: number;
    serverName?: string;
    address?: string;
    updated?: string;
    cpu?: number;
    ram?: number;
    usedCpuPercent?: number;
    usedRamPercent?: number;
    us?: number;
}

@Table({ tableName: 'dedicatedserverstats', timestamps: false })
export class DedicatedServerStats extends Model<DedicatedServerStatsAttributes, DedicatedServerStatsAttributes> implements DedicatedServerStatsAttributes {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
    @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.STRING(100), defaultValue: 'NULL' })
    serverName?: string;
    @Column({ allowNull: true, type: DataType.STRING(25), defaultValue: 'NULL' })
    address?: string;
    @Column({ allowNull: true, type: DataType.STRING, defaultValue: 'NULL' })
    updated?: string;
    @Column({ allowNull: true, type: DataType.TINYINT, defaultValue: 'NULL' })
    cpu?: number;
    @Column({ allowNull: true, type: DataType.MEDIUMINT, defaultValue: 'NULL' })
    ram?: number;
    @Column({ allowNull: true, type: DataType.DOUBLE(4, 2), defaultValue: 'NULL' })
    usedCpuPercent?: number;
    @Column({ allowNull: true, type: DataType.DOUBLE(4, 2), defaultValue: 'NULL' })
    usedRamPercent?: number;
    @Column({ field: 'US', type: DataType.TINYINT, defaultValue: '1' })
    us?: number;
}
