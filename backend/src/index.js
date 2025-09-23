require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/stores', require('./routes/store.routes'));
app.use('/api/ratings', require('./routes/rating.routes'));

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true }); // dev-friendly; migrations recommended for production
    console.log('DB connected and synced');
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  } catch (err) {
    console.error('Startup error:', err);
    process.exit(1);
  }
})();
