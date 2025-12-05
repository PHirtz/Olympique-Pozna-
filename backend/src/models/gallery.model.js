import db from "../database/db.js";
import { Model, DataTypes } from "sequelize";

export class Gallery extends Model {}

Gallery.init(
  {
    title: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    titlePl: {
      type: DataTypes.STRING(150),
      allowNull: true
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
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    imagePath: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    albumName: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'events',
        key: 'id'
      }
    },
    matchId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'matches',
        key: 'id'
      }
    },
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'teams',
        key: 'id'
      }
    },
    uploadedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    sequelize: db,
    tableName: "gallery",
    timestamps: true,
    underscored: true
  }
);

export default Gallery;