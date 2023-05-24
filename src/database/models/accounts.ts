import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "accounts",
})
export class Account extends Model {
  @Column({
    type: DataType.INTEGER(),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
    unique: true
  })

  uuid!: string;

  @Column({
    type: DataType.STRING(40),
    allowNull: true,
    unique: true
  })

  name!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })

  gems!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })

  coins!: number;

  @Column({
    type: DataType.STRING(),
    allowNull: true,
  })

  lastLogin!: string;

  @Column({
    type: DataType.STRING(),
    allowNull: true,
  })

  totalPlayTime!: string;
}

@Table({
  timestamps: false,
  tableName: "accountranks",
})

export class AccountRank extends Model{
  @Column({
    type: DataType.INTEGER(),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.INTEGER(),
    allowNull: false,
  })
  accountId!: number;

  @Column({
    type: DataType.STRING(40),
    allowNull: true,
  })

  rankIdentifier!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })

  primaryGroup!: boolean;
}

@Table({
  timestamps: false,
  tableName: "accountpunishments",
})

export class AccountPunishment extends Model{
  @Column({
    type: DataType.INTEGER(),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })

  accountId!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })

  category!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })

  sentence!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })

  reason!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  time!: Date;


  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
  })

  duration!: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })

  admin!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })

  severity!: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })

  removed!: boolean;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  removedReason?: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  removedAdmin?: string;
}