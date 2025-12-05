const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const User = require('../models/User');
const Service = require('../models/Service');

async function seed() {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      // Use a local file-based MongoDB via mongodb-memory-server with persistence
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create({ instance: { dbPath: './data' } });
      await mongoose.connect(mongod.getUri(), { useNewUrlParser: true, useUnifiedTopology: true });
    } else {
      await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    }

    await User.deleteMany({});
    await Service.deleteMany({});

    const adminPass = await bcrypt.hash('admin123', 10);
    const userPass = await bcrypt.hash('user123', 10);

    const admin = new User({ name: 'Admin', email: 'admin@example.com', password: adminPass, role: 'admin' });
    const user = new User({ name: 'Demo User', email: 'user@example.com', password: userPass, role: 'user' });
    await admin.save();
    await user.save();

    const services = [
      { title: 'Web App Development', description: 'Full-stack web applications', price: 2500, durationDays: 7, category: 'Development' },
      { title: 'Mobile App Development', description: 'iOS and Android apps', price: 4000, durationDays: 14, category: 'Development' },
      { title: 'UI/UX Design', description: 'User-centered design', price: 1200, durationDays: 5, category: 'Design' }
    ];

    for (const s of services) {
      const svc = new Service(s);
      await svc.save();
    }

    console.log('Seeded database');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
