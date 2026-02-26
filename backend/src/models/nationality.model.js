import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js'; 

const Nationality = sequelize.define('Nationality', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  code: {
    type: DataTypes.STRING(3),
    allowNull: false,
    unique: true
  },
  nameFr: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'name_fr'
  },
  nameEn: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'name_en'
  },
  namePl: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'name_pl'
  },
  flagEmoji: {
    type: DataTypes.STRING(10),
    field: 'flag_emoji'
  }
}, {
  tableName: 'nationalities_reference',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
  underscored: true
});

export default Nationality;