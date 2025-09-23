const { Op } = require('sequelize');
const User = require('../models/user.model');
const Store = require('../models/store.model');
const Rating = require('../models/rating.model');

exports.dashboard = async (req, res) => {
  const totalUsers = await User.count();
  const totalStores = await Store.count();
  const totalRatings = await Rating.count();
  res.json({ totalUsers, totalStores, totalRatings });
};

// Create user (admin creates other users including admins/store owners)
exports.createUser = async (req, res) => {
  const { name, email, password, address, role } = req.body;
  // minimal checks here; admin should follow same password rules
  if (!name || !email || !password) return res.status(400).json({ message: 'name,email,password required' });
  // reuse bcrypt here
  const bcrypt = require('bcrypt');
  const exists = await User.findOne({ where: { email } });
  if (exists) return res.status(400).json({ message: 'Email exists' });
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, address, role: role || 'USER', password_hash: hash });
  res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
};

exports.listUsers = async (req, res) => {
  const { name, email, address, role, sortBy = 'name', order = 'ASC', page = 1, limit = 20 } = req.query;
  const where = {};
  if (name) where.name = { [Op.iLike]: `%${name}%` };
  if (email) where.email = { [Op.iLike]: `%${email}%` };
  if (address) where.address = { [Op.iLike]: `%${address}%` };
  if (role) where.role = role;

  const offset = (page - 1) * limit;
  const { count, rows } = await User.findAndCountAll({
    where,
    order: [[sortBy, order.toUpperCase()]],
    limit: +limit,
    offset: +offset,
    attributes: ['id', 'name', 'email', 'address', 'role', 'createdAt']
  });

  res.json({ count, rows, page: +page, limit: +limit });
};

exports.listStores = async (req, res) => {
  const { name, email, address, sortBy = 'name', order = 'ASC', page = 1, limit = 20 } = req.query;
  const where = {};
  if (name) where.name = { [Op.iLike]: `%${name}%` };
  if (email) where.email = { [Op.iLike]: `%${email}%` };
  if (address) where.address = { [Op.iLike]: `%${address}%` };

  const offset = (page - 1) * limit;
  const { count, rows } = await Store.findAndCountAll({
    where,
    include: [{ model: User, as: 'owner', attributes: ['id', 'name', 'email'] }],
    order: [[sortBy, order.toUpperCase()]],
    limit: +limit,
    offset: +offset
  });

  // include average rating for each store
  const Sequelize = require('sequelize');
  const avgPromises = rows.map(async s => {
    const avg = await Rating.findOne({
      where: { store_id: s.id },
      attributes: [[Sequelize.fn('AVG', Sequelize.col('rating')), 'avg_rating']],
      raw: true
    });
    return { ...s.toJSON(), avg_rating: avg?.avg_rating ? parseFloat(avg.avg_rating).toFixed(2) : null };
  });
  const storesWithAvg = await Promise.all(avgPromises);

  res.json({ count, rows: storesWithAvg, page: +page, limit: +limit });
};
