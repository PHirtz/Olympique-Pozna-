import db from "../database/db.js";
import { Model, DataTypes } from "sequelize";

export class Partner extends Model {}

Partner.init(
  {
    name: {
      type: DataTypes.STRING(150),
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
    logoUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    logoPath: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    websiteUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    category: {
      type: DataTypes.ENUM('main_sponsor', 'official_partner', 'supplier', 'media_partner'),
      allowNull: false,
      defaultValue: 'official_partner'
    },
    displayOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    sequelize: db,
    tableName: "partners",
    timestamps: true,
    underscored: true
  }
);

export default Partner;