const express = require('express');
const router = express.Router();
const storeCtrl = require('../controllers/store.controller');
const auth = require('../middlewares/auth.middleware');
const role = require('../middlewares/role.middleware');

router.get('/', storeCtrl.list);
router.get('/:id', auth.optional ? storeCtrl.detail : storeCtrl.detail); // public detail if no auth, but detail checks req.user
// owner-specific ratings list
router.get('/:id/ratings', auth, role('STORE_OWNER', 'ADMIN'), storeCtrl.ratingsForStore);

module.exports = router;
