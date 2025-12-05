const express = require('express');
const router = express.Router();

const Booking = require('../models/Booking');
const Service = require('../models/Service');
const auth = require('../middleware/auth');

// Create booking (user)
router.post('/', auth(true, false), async (req, res) => {
  try {
    const { serviceId, date, time, notes } = req.body;
    const service = await Service.findById(serviceId);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    const booking = new Booking({
      user: req.user.id,
      service: service._id,
      serviceName: service.title,
      servicePrice: service.price,
      date,
      time,
      notes
    });
    await booking.save();
    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// List bookings (user sees own; admin sees all)
router.get('/', auth(true, false), async (req, res) => {
  try {
    let query = {};
    if (req.user.role !== 'admin') {
      query.user = req.user.id;
    }
    const bookings = await Booking.find(query).sort({ createdAt: -1 }).populate('service').populate('user', 'name email');
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin - update status
router.put('/:id/status', auth(true, true), async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['pending', 'approved', 'declined'];
    if (!allowed.includes(status)) return res.status(400).json({ message: 'Invalid status' });
    const updated = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
