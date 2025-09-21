const express = require('express');
const Contact = require('../models/Contact');

const router = express.Router();

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message, type } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const contact = new Contact({
      name,
      email,
      subject,
      message,
      type: type || 'general'
    });

    await contact.save();

    res.status(201).json({
      message: 'Message sent successfully. We will get back to you within 24 hours.',
      contactId: contact._id
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;