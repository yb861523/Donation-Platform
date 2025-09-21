const express = require('express');
const Donation = require('../models/Donation');
const Contact = require('../models/Contact');
const User = require('../models/User');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// Get dashboard overview stats
router.get('/overview', adminAuth, async (req, res) => {
  try {
    const [
      totalDonations,
      pendingDonations,
      completedDonations,
      totalContacts,
      newContacts,
      totalUsers,
      recentDonations,
      recentContacts
    ] = await Promise.all([
      Donation.countDocuments(),
      Donation.countDocuments({ status: 'pending' }),
      Donation.countDocuments({ status: 'delivered' }),
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'new' }),
      User.countDocuments(),
      Donation.find()
        .populate('donor', 'name email')
        .sort({ createdAt: -1 })
        .limit(5)
        .select('category type quantity status createdAt'),
      Contact.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('name email subject type status createdAt')
    ]);

    res.json({
      stats: {
        donations: {
          total: totalDonations,
          pending: pendingDonations,
          completed: completedDonations
        },
        contacts: {
          total: totalContacts,
          new: newContacts
        },
        users: {
          total: totalUsers
        }
      },
      recent: {
        donations: recentDonations,
        contacts: recentContacts
      }
    });
  } catch (error) {
    console.error('Error fetching admin overview:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all donations with pagination
router.get('/donations', adminAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const category = req.query.category;

    let query = {};
    if (status) query.status = status;
    if (category) query.category = category;

    const donations = await Donation.find(query)
      .populate('donor', 'name email')
      .populate('assignedVolunteer', 'name email')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Donation.countDocuments(query);

    res.json({
      donations,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update donation status
router.put('/donations/:id/status', adminAuth, async (req, res) => {
  try {
    const { status, assignedVolunteer, pickupNotes } = req.body;

    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      {
        status,
        assignedVolunteer,
        pickupNotes,
        ...(status === 'delivered' && { deliveredAt: new Date() })
      },
      { new: true }
    ).populate('donor', 'name email').populate('assignedVolunteer', 'name email');

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    res.json({ donation });
  } catch (error) {
    console.error('Error updating donation:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all contacts with pagination
router.get('/contacts', adminAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const type = req.query.type;

    let query = {};
    if (status) query.status = status;
    if (type) query.type = type;

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Contact.countDocuments(query);

    res.json({
      contacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update contact status
router.put('/contacts/:id/status', adminAuth, async (req, res) => {
  try {
    const { status, response, assignedTo } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        status,
        response,
        assignedTo,
        ...(status !== 'new' && { respondedAt: new Date() })
      },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json({ contact });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all users with pagination
router.get('/users', adminAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const role = req.query.role;

    let query = {};
    if (role) query.role = role;

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await User.countDocuments(query);

    res.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;