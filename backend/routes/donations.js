const express = require('express');
const Donation = require('../models/Donation');
const auth = require('../middleware/auth');

const router = express.Router();

// Create a new donation
router.post('/', auth, async (req, res) => {
  try {
    const { category, type, quantity, location, date, time, description, contact } = req.body;

    if (!category || !type || !quantity || !location || !date || !time || !contact) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const donation = new Donation({
      donor: req.user._id,
      category,
      type,
      quantity,
      location,
      date: new Date(date),
      time,
      description,
      contact
    });

    await donation.save();

    res.status(201).json({
      message: 'Donation created successfully',
      donation: {
        id: donation._id,
        category: donation.category,
        type: donation.type,
        quantity: donation.quantity,
        location: donation.location,
        date: donation.date,
        time: donation.time,
        status: donation.status,
        createdAt: donation.createdAt
      }
    });
  } catch (error) {
    console.error('Error creating donation:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's donations
router.get('/', auth, async (req, res) => {
  try {
    const donations = await Donation.find({ donor: req.user._id })
      .sort({ createdAt: -1 })
      .select('category type quantity location date time status createdAt');

    res.json({ donations });
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get specific donation details
router.get('/:id', auth, async (req, res) => {
  try {
    const donation = await Donation.findOne({
      _id: req.params.id,
      donor: req.user._id
    });

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    res.json({ donation });
  } catch (error) {
    console.error('Error fetching donation:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;