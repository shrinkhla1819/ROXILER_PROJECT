const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();

module.exports = async function (req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'No authorization header' });
  const token = header.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(payload.id);
    if (!user) return res.status(401).json({ message: 'Invalid token' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
