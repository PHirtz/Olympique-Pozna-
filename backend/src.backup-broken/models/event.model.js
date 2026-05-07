import db from "../database/db.js";
import { Model, DataTypes } from "sequelize";

export class Event extends Model {}

Event.init(
  {
    title: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    titlePl: {
      type: DataTypes.STRING(200),
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
    eventDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    location: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    locationPl: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM('training', 'tournament', 'social', 'meeting', 'other'),
      allowNull: false
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
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'teams',
        key: 'id'
      }
    },
    maxParticipants: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    registrationRequired: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    status: {
      type: DataTypes.ENUM('upcoming', 'ongoing', 'completed', 'cancelled'),
      allowNull: false,
      defaultValue: 'upcoming'
    }
  },
  {
    sequelize: db,
    tableName: "events",
    timestamps: true,
    underscored: true
  }
);

export default Event;