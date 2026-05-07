import db from "../database/db.js";
import { Model, DataTypes } from "sequelize";

export class CampRegistration extends Model {}

CampRegistration.init(
  {
    campId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'camps',
        key: 'id'
      }
    },
    // Informations du participant
    childFirstName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    childLastName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    childDateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    childGender: {
      type: DataTypes.ENUM('male', 'female', 'other'),
      allowNull: false
    },
    // Informations du parent/tuteur
    parentFirstName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    parentLastName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    parentEmail: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    parentPhone: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    // Adresse
    address: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    postalCode: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: 'Pologne'
    },
    // Informations médicales
    medicalInfo: {
      type: DataTypes.TEXT,
      allowNull: true,
      // Allergies, traitements, etc.
    },
    emergencyContact: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    emergencyPhone: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    // Niveau sportif
    sportLevel: {
      type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'),
      allowNull: false
    },
    previousExperience: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    // Informations complémentaires
    dietaryRestrictions: {
      type: DataTypes.TEXT,
      allowNull: true
      // Végétarien, allergies alimentaires, etc.
    },
    specialNeeds: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    // Statut de l'inscription
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'paid', 'cancelled', 'waiting_list'),
      allowNull: false,
      defaultValue: 'pending'
    },
    paymentStatus: {
      type: DataTypes.ENUM('pending', 'partial', 'completed', 'refunded'),
      allowNull: false,
      defaultValue: 'pending'
    },
    paymentAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    paymentDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    // Acceptation des conditions
    termsAccepted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    gdprConsent: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    photoConsent: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    // Métadonnées
    registrationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    confirmationToken: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true
    },
    confirmedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    sequelize: db,
    tableName: "camp_registrations",
    timestamps: true,
    underscored: true
  }
);

export default CampRegistration;