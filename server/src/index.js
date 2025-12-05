const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Smart Service Booking Platform API' });
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/services', require('./routes/services'));
app.use('/api/bookings', require('./routes/bookings'));

async function seedDB() {
  try {
    const User = require('./models/User');
    const Service = require('./models/Service');
    
    const userCount = await User.countDocuments();
    const serviceCount = await Service.countDocuments();
    
    if (userCount === 0) {
      console.log('Seeding users...');
      const adminPass = await bcrypt.hash('admin123', 10);
      const userPass = await bcrypt.hash('user123', 10);
      await User.insertMany([
        { name: 'Admin', email: 'admin@example.com', password: adminPass, role: 'admin' },
        { name: 'Demo User', email: 'user@example.com', password: userPass, role: 'user' }
      ]);
      console.log('Users seeded');
    }
    
    if (serviceCount === 0) {
      console.log('Seeding services...');
      await Service.insertMany([
        { title: 'Web App Development', description: 'Full-stack web applications', price: 2500, durationDays: 7, category: 'Development' },
        { title: 'Mobile App Development', description: 'iOS and Android apps', price: 4000, durationDays: 14, category: 'Development' },
        { title: 'UI/UX Design', description: 'User-centered design', price: 1200, durationDays: 5, category: 'Design' }
      ]);
      console.log('Services seeded');
    }
  } catch (err) {
    console.error('Seed error:', err.message);
  }
}

async function start() {
  try {
    if (process.env.MONGO_URI) {
      await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Connected to MongoDB');
    } else {
      // Use in-memory mongo for local dev/testing
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Connected to in-memory MongoDB');
    }

    await seedDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();
