const express = require('express');
const router = express.Router();

const Service = require('../models/Service');
const auth = require('../middleware/auth');

// Public - list services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin - create
router.post('/', auth(true, true), async (req, res) => {
  try {
    const { title, description, price, durationDays, category } = req.body;
    const service = new Service({ title, description, price, durationDays, category });
    await service.save();
    res.json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin - update
router.put('/:id', auth(true, true), async (req, res) => {
  try {
    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin - delete
router.delete('/:id', auth(true, true), async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
