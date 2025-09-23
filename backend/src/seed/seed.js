const bcrypt = require('bcrypt');
const sequelize = require('../config/db');
const User = require('../models/user.model');
const Store = require('../models/store.model');
const Rating = require('../models/rating.model');

(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('DB dropped & re-created');

    const adminPass = 'Admin@123'; // meets regex
    const adminHash = await bcrypt.hash(adminPass, 10);
    const admin = await User.create({ name: 'Administrator AdministratorX', email: 'admin@example.com', password_hash: adminHash, address: 'HQ Address', role: 'ADMIN' });

    const ownerPass = 'Owner@123';
    const ownerHash = await bcrypt.hash(ownerPass, 10);
    const owner = await User.create({ name: 'Store Owner OwnerOwnerOwner', email: 'owner@example.com', password_hash: ownerHash, address: 'Owner Address', role: 'STORE_OWNER' });

    // some normal users
    const userPass = 'User@1234';
    const userHash = await bcrypt.hash(userPass, 10);
    const user1 = await User.create({ name: 'Normal User NumberOneNormalUser', email: 'user1@example.com', password_hash: userHash, address: 'User Address 1', role: 'USER' });
    const user2 = await User.create({ name: 'Normal User NumberTwoNormalUser', email: 'user2@example.com', password_hash: userHash, address: 'User Address 2', role: 'USER' });

    const store1 = await Store.create({ name: 'Sunrise Groceries', email: 'sun@shop.com', address: 'Lane 12, City', owner_user_id: owner.id });
    const store2 = await Store.create({ name: 'Moonlight Cafe', email: 'moon@cafe.com', address: 'Avenue 45, City', owner_user_id: owner.id });

    await Rating.create({ user_id: user1.id, store_id: store1.id, rating: 4, comment: 'Nice selection' });
    await Rating.create({ user_id: user2.id, store_id: store1.id, rating: 5, comment: 'Amazing' });
    await Rating.create({ user_id: admin.id, store_id: store2.id, rating: 5, comment: 'Great vibes' });

    console.log('Seed completed. Admin: admin@example.com / Admin@123 ; Owner: owner@example.com / Owner@123 ; Users: user1@example.com / User@1234');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
