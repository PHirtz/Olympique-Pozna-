import db from "../database/db.js";
import { Model, DataTypes } from "sequelize";

export class News extends Model {}

News.init(
  {
    title: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    titlePl: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    slug: {
      type: DataTypes.STRING(250),
      allowNull: false,
      unique: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    contentPl: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    excerpt: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    excerptPl: {
      type: DataTypes.STRING(300),
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
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
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
    category: {
      type: DataTypes.ENUM('match_report', 'event', 'announcement', 'general'),
      allowNull: false,
      defaultValue: 'general'
    },
    publishedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('draft', 'published', 'archived'),
      allowNull: false,
      defaultValue: 'draft'
    },
    isPinned: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    sequelize: db,
    tableName: "news",
    timestamps: true,
    underscored: true
  }
);

export default News;