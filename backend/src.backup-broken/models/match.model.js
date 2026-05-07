import db from "../database/db.js";
import { Model, DataTypes } from "sequelize";

export class Match extends Model {}

Match.init(
  {
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'teams',
        key: 'id'
      }
    },
    opponentName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    matchDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    isHome: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    competition: {
      type: DataTypes.STRING(100),
      allowNull: true
      // Ex: 'Championnat', 'Coupe', 'Amical'
    },
    status: {
      type: DataTypes.ENUM('scheduled', 'in_progress', 'finished', 'cancelled', 'postponed'),
      allowNull: false,
      defaultValue: 'scheduled'
    },
    scoreHome: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    scoreAway: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    matchReport: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    matchReportPl: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    sequelize: db,
    tableName: "matches",
    timestamps: true,
    underscored: true
  }
);

export default Match;