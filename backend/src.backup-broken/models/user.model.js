import db from "../database/db.js";
import { Model, DataTypes } from "sequelize";

export class User extends Model {}

User.init(
  {
    lastName: { 
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    firstName: { 
      type: DataTypes.STRING(100), 
      allowNull: false
    },
    email: { 
      type: DataTypes.STRING(150), 
      allowNull: false, 
      validate: {
        isEmail: true
      } 
    },
    username: {
      type: DataTypes.STRING(20), 
      allowNull: false, 
    },
    password: { 
      type: DataTypes.STRING(255),
      allowNull: false 
    },
    role: {
      type: DataTypes.ENUM('admin', 'coach', 'player', 'member'),
      allowNull: false,
      defaultValue: 'member'
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
    bio: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    phoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    nationality: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    // Pour les joueurs
    playerNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 99
      }
    },
    position: {
      type: DataTypes.STRING(50),
      allowNull: true
      // Ex: 'Attaquant', 'Défenseur', 'Milieu', 'Gardien'
    },
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'teams',
        key: 'id'
      }
    },
    // Informations d'adhésion
    membershipStatus: {
      type: DataTypes.ENUM('active', 'inactive', 'pending'),
      allowNull: false,
      defaultValue: 'pending'
    },
    membershipStartDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    membershipEndDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    // Préférence linguistique
    preferredLanguage: {
      type: DataTypes.ENUM('fr', 'pl'),
      allowNull: false,
      defaultValue: 'fr'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  { 
    sequelize: db, 
    tableName: "users", 
    timestamps: true, 
    underscored: true,
    indexes: [
    {
      unique: true,
      fields: ['email']
    },
    {
      unique: true,
      fields: ['username']
    }
  ]
  }
);

export default User;