import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const Contact = db.define('Contact', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  subject: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('new', 'read', 'replied', 'archived'),
    defaultValue: 'new'
  },
  replied: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  repliedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'contacts',
  timestamps: true
});

export default Contact;