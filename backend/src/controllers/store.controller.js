const { Op } = require('sequelize');
const Store = require('../models/store.model');
const Rating = require('../models/rating.model');
const Sequelize = require('sequelize');

exports.createStore = async (req, res) => {
  const { name, email, address, owner_user_id } = req.body;
  if (!name) return res.status(400).json({ message: 'name required' });
  const s = await Store.create({ name, email, address, owner_user_id: owner_user_id || null });
  res.json({ store: s });
};

exports.list = async (req, res) => {
  const { searchName, searchAddress, sortBy = 'name', order = 'ASC', page = 1, limit = 20 } = req.query;
  const where = {};
  if (searchName) where.name = { [Op.iLike]: `%${searchName}%` };
  if (searchAddress) where.address = { [Op.iLike]: `%${searchAddress}%` };

  const offset = (page - 1) * limit;
  const { count, rows } = await Store.findAndCountAll({
    where,
    limit: +limit,
    offset: +offset,
    order: [[sortBy, order.toUpperCase()]]
  });

  // get average ratings for each store
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

exports.detail = async (req, res) => {
  const id = req.params.id;
  const store = await Store.findByPk(id);
  if (!store) return res.status(404).json({ message: 'Not found' });

  const avg = await Rating.findOne({
    where: { store_id: store.id },
    attributes: [[Sequelize.fn('AVG', Sequelize.col('rating')), 'avg_rating']],
    raw: true
  });

  let userRating = null;
  if (req.user) {
    const ur = await Rating.findOne({ where: { user_id: req.user.id, store_id: store.id } });
    if (ur) userRating = ur.rating;
  }

  res.json({ store, avg_rating: avg?.avg_rating ? parseFloat(avg.avg_rating).toFixed(2) : null, userRating });
};

// For store owner: list users who rated this store
exports.ratingsForStore = async (req, res) => {
  const storeId = req.params.id;
  const ratings = await Rating.findAll({
    where: { store_id: storeId },
    include: [{ model: require('../models/user.model'), attributes: ['id', 'name', 'email', 'address'] }],
    order: [['created_at', 'DESC']]
  });
  res.json({ ratings });
};
