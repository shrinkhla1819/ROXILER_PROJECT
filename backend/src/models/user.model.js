const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(60), allowNull: false },
  email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
  password_hash: { type: DataTypes.STRING(255), allowNull: false },
  address: { type: DataTypes.STRING(400) },
  role: { type: DataTypes.STRING(20), allowNull: false, defaultValue: 'USER' }
}, {
  tableName: 'users',
  underscored: true,
  timestamps: true
});

module.exports = User;
