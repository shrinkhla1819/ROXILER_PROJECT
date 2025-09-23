const express = require('express');
const router = express.Router();
const ratingCtrl = require('../controllers/rating.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/', auth, ratingCtrl.submitRating);
router.get('/user/me', auth, ratingCtrl.userRatings);
router.get('/store/:id', ratingCtrl.ratingsForStorePublic); // public listing of ratings for store

module.exports = router;
