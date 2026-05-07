import db from "../database/db.js";
import { Model, DataTypes } from "sequelize";

export class Camp extends Model {}

Camp.init(
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
      allowNull: false
    },
    descriptionPl: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    locationPl: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true,
      // Ex: 52.4064 pour Poznań
      validate: {
        min: -90,
        max: 90
      }
    },
    longitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: true,
      // Ex: 16.9252 pour Poznań
      validate: {
        min: -180,
        max: 180
      }
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    currency: {
      type: DataTypes.STRING(3),
      allowNull: false,
      defaultValue: 'EUR'
    },
    ageMin: {
      type: DataTypes.INTEGER,
      allowNull: true,
      // Ex: 6 ans minimum
    },
    ageMax: {
      type: DataTypes.INTEGER,
      allowNull: true,
      // Ex: 16 ans maximum
    },
    maxParticipants: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 30
    },
    currentParticipants: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
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
    type: {
      type: DataTypes.ENUM('summer', 'winter', 'spring', 'autumn', 'special'),
      allowNull: false,
      defaultValue: 'summer'
    },
    level: {
      type: DataTypes.ENUM('beginner', 'intermediate', 'advanced', 'all'),
      allowNull: false,
      defaultValue: 'all'
    },
    activities: {
      type: DataTypes.JSON,
      allowNull: true,
      // Ex: ["Football", "Natation", "Jeux collectifs"]
    },
    includedServices: {
      type: DataTypes.JSON,
      allowNull: true,
      // Ex: ["Repas", "Encadrement", "Assurance"]
    },
    requirements: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    requirementsPl: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    contactEmail: {
      type: DataTypes.STRING(150),
      allowNull: true,
      validate: {
        isEmail: true
      }
    },
    contactPhone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    registrationDeadline: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('draft', 'open', 'full', 'closed', 'cancelled'),
      allowNull: false,
      defaultValue: 'draft'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    sequelize: db,
    tableName: "camps",
    timestamps: true,
    underscored: true
  }
);

export default Camp;