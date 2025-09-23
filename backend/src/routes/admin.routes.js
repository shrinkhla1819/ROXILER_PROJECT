const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const role = require('../middlewares/role.middleware');
const adminCtrl = require('../controllers/admin.controller');
const storeCtrl = require('../controllers/store.controller');

router.get('/dashboard', auth, role('ADMIN'), adminCtrl.dashboard);
router.post('/users', auth, role('ADMIN'), adminCtrl.createUser);
router.get('/users', auth, role('ADMIN'), adminCtrl.listUsers);

router.post('/stores', auth, role('ADMIN'), storeCtrl.createStore);
router.get('/stores', auth, role('ADMIN'), adminCtrl.listStores);

module.exports = router;
