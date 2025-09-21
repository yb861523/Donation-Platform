const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    enum: ['food', 'clothes'],
    required: true
  },
  type: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    enum: ['morning', 'afternoon', 'evening'],
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  contact: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'picked_up', 'delivered', 'cancelled'],
    default: 'pending'
  },
  assignedVolunteer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  pickupNotes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for efficient queries
donationSchema.index({ donor: 1, createdAt: -1 });
donationSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Donation', donationSchema);