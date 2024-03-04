import { Column, DataType, Index, Model, Table } from 'sequelize-typescript';

export interface NetworkStatsAttributes {
    id?: number;
    updated?: string;
    players?: number;
    totalNetworkCpuUsage?: number;
    totalNetworkRamUsage?: number;
    totalCpu?: number;
    totalRam?: number;
    us?: number;
}

@Table({ tableName: 'networkstats', timestamps: false })
export class NetworkStats extends Model<NetworkStatsAttributes, NetworkStatsAttributes> implements NetworkStatsAttributes {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
    @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.STRING, defaultValue: 'NULL' })
    updated?: string;
    @Column({ allowNull: true, type: DataType.INTEGER, defaultValue: 'NULL' })
    players?: number;
    @Column({ allowNull: true, type: DataType.DOUBLE(4, 2), defaultValue: 'NULL' })
    totalNetworkCpuUsage?: number;
    @Column({ allowNull: true, type: DataType.DOUBLE(4, 2), defaultValue: 'NULL' })
    totalNetworkRamUsage?: number;
    @Column({ allowNull: true, type: DataType.MEDIUMINT, defaultValue: 'NULL' })
    totalCpu?: number;
    @Column({ allowNull: true, type: DataType.MEDIUMINT, defaultValue: 'NULL' })
    totalRam?: number;
    @Column({ field: 'US', type: DataType.TINYINT, defaultValue: '1' })
    us?: number;
}
