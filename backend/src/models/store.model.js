const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user.model');

const Store = sequelize.define('Store', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(255), allowNull: false },
  email: { type: DataTypes.STRING(255) },
  address: { type: DataTypes.STRING(400) }
}, {
  tableName: 'stores',
  underscored: true,
  timestamps: true
});

Store.belongsTo(User, { as: 'owner', foreignKey: 'owner_user_id' });
User.hasMany(Store, { foreignKey: 'owner_user_id' });

module.exports = Store;
