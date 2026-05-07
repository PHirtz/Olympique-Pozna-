import db from "../database/db.js";
import { Model, DataTypes } from "sequelize";

export class Statistics extends Model {}

Statistics.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    season: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    matchesPlayed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    goals: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    assists: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    yellowCards: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    redCards: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    minutesPlayed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  },
  {
    sequelize: db,
    tableName: "statistics",
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'season']
      }
    ]
  }
);

export default Statistics;