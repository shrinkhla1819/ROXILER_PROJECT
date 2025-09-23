const Rating = require('../models/rating.model');
const Store = require('../models/store.model');

exports.submitRating = async (req, res) => {
  const { store_id, rating, comment } = req.body;
  if (!store_id || !rating) return res.status(400).json({ message: 'store_id and rating required' });
  if (rating < 1 || rating > 5) return res.status(400).json({ message: 'Rating must be 1-5' });

  const store = await Store.findByPk(store_id);
  if (!store) return res.status(404).json({ message: 'Store not found' });

  let r = await Rating.findOne({ where: { user_id: req.user.id, store_id } });
  if (r) {
    r.rating = rating;
    r.comment = comment || r.comment;
    await r.save();
    return res.json({ message: 'Rating updated', rating: r });
  } else {
    r = await Rating.create({ user_id: req.user.id, store_id, rating, comment });
    return res.json({ message: 'Rating submitted', rating: r });
  }
};

exports.userRatings = async (req, res) => {
  const userId = req.user.id;
  const ratings = await Rating.findAll({ where: { user_id: userId }, include: [{ model: require('../models/store.model') }] });
  res.json({ ratings });
};

exports.ratingsForStorePublic = async (req, res) => {
  const storeId = req.params.id;
  const ratings = await Rating.findAll({
    where: { store_id: storeId },
    include: [{ model: require('../models/user.model'), attributes: ['id', 'name'] }]
  });
  res.json({ ratings });
};
