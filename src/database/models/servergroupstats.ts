import { Column, DataType, Index, Model, Table } from 'sequelize-typescript';

export interface ServerGroupStatsAttributes {
    id?: number;
    serverGroup?: string;
    updated?: string;
    players?: number;
    maxPlayers?: number;
    totalNetworkCpuUsage?: number;
    totalNetworkRamUsage?: number;
    totalCpu?: number;
    totalRam?: number;
    us?: number;
}

@Table({ tableName: 'servergroupstats', timestamps: false })
export class ServerGroupStats extends Model<ServerGroupStatsAttributes, ServerGroupStatsAttributes> implements ServerGroupStatsAttributes {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
    @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.STRING(100), defaultValue: 'NULL' })
    serverGroup?: string;
    @Column({ allowNull: true, type: DataType.STRING, defaultValue: 'NULL' })
    updated?: string;
    @Column({ allowNull: true, type: DataType.INTEGER, defaultValue: 'NULL' })
    players?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, defaultValue: 'NULL' })
    maxPlayers?: number;
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
