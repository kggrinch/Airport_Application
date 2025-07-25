const express = require('express');
const cors = require('cors');
const sequelize = require('./config');
const adminRoutes = require('./routes/admin');
const customerRoutes = require('./routes/customer');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/admin', adminRoutes);
app.use('/customer', customerRoutes);

// Start server after DB connects
sequelize.sync().then(() =>
{
  console.log('Database synced');
  app.listen(3000, () => console.log('Server running at http://localhost:3000'));
})
.catch(err => 
  {
  console.error('DB connection failed:', err);
});
