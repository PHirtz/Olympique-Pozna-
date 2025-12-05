import db from "../database/db.js";
import { Model, DataTypes } from "sequelize";

export class Product extends Model {}

Product.init(
  {
    name: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    namePl: {
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
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    currency: {
      type: DataTypes.STRING(3),
      allowNull: false,
      defaultValue: 'EUR'
    },
    category: {
      type: DataTypes.ENUM('jersey', 'clothing', 'accessories', 'equipment', 'other'),
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
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    sizes: {
      type: DataTypes.JSON,
      allowNull: true
      // Ex: ['XS', 'S', 'M', 'L', 'XL']
    },
    colors: {
      type: DataTypes.JSON,
      allowNull: true
      // Ex: ['red', 'blue', 'white']
    }
  },
  {
    sequelize: db,
    tableName: "products",
    timestamps: true,
    underscored: true
  }
);

export default Product;