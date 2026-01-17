import db from "../database/db.js";
import { Model, DataTypes } from "sequelize";

export class Team extends Model {}

Team.init(
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    namePl: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    slug: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: true
    },
    category: {
      type: DataTypes.ENUM('senior', 'u19', 'u17', 'u15', 'u13', 'u11', 'u9', 'u7'),
      allowNull: false
    },
    gender: {
      type: DataTypes.ENUM('male', 'female', 'mixed'),
      allowNull: false,
      defaultValue: 'male'
    },
    season: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    descriptionPl: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    imageUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    imagePath: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    coachId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    sequelize: db,
    tableName: "teams",
    timestamps: true,
    underscored: true
  }
);

export default Team;