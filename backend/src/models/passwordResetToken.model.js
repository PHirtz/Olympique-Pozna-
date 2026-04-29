import db from "../database/db.js";
import { Model, DataTypes } from "sequelize";

export class PasswordResetToken extends Model {}

PasswordResetToken.init(
  {
    token: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    used: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize: db,
    tableName: "password_reset_tokens",
    timestamps: true,
    underscored: true,
  }
);

export default PasswordResetToken;