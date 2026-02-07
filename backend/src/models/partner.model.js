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

    descriptionEn: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'description_en'
    },

    descriptionPl: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'description_pl'
    },

    logoUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: { isUrl: true },
      field: 'logo_url'
    },

    logoPath: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'logo_path'
    },

    websiteUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: { isUrl: true },
      field: 'website_url'
    },

    category: {
      type: DataTypes.ENUM(
        'main_sponsor',
        'official_partner',
        'supplier',
        'media_partner'
      ),
      allowNull: false,
      defaultValue: 'official_partner'
    },

    displayOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'display_order'
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: 'is_active'
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