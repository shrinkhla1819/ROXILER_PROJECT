const sequelize = require('../config/db');
const User = require('./user.model');
const Store = require('./store.model');
const Rating = require('./rating.model');

// associations are set in model files (some linking done twice for clarity)
module.exports = { sequelize, User, Store, Rating };
