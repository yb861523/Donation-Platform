const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Load admin credentials from admin.env
const adminEnvPath = path.join(__dirname, '..', 'admin.env');
let adminCredentials = {};

if (fs.existsSync(adminEnvPath)) {
  const adminEnv = fs.readFileSync(adminEnvPath, 'utf8');
  adminEnv.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      adminCredentials[key.trim()] = value.trim();
    }
  });
}

// Admin login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // Check admin credentials
  if (email !== adminCredentials.ADMIN_EMAIL) {
    return res.status(401).json({ message: 'Invalid admin credentials' });
  }

  try {
    const isValidPassword = await bcrypt.compare(password, adminCredentials.ADMIN_PASSWORD);
    if (!isValidPassword && password !== adminCredentials.ADMIN_PASSWORD) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }

    const token = jwt.sign(
      {
        email: adminCredentials.ADMIN_EMAIL,
        role: 'admin',
        name: adminCredentials.ADMIN_NAME
      },
      adminCredentials.ADMIN_JWT_SECRET || process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      message: 'Admin login successful',
      token,
      admin: {
        email: adminCredentials.ADMIN_EMAIL,
        name: adminCredentials.ADMIN_NAME,
        role: 'admin'
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Verify admin token
router.get('/verify', (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, adminCredentials.ADMIN_JWT_SECRET || process.env.JWT_SECRET);

    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized as admin' });
    }

    res.json({
      valid: true,
      admin: {
        email: decoded.email,
        name: decoded.name,
        role: decoded.role
      }
    });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;