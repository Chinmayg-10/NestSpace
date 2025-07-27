const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Property = require('../models/Property');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "secret";

// Register
router.post('/register', async (req, res) => {
  const { name, email, password,role} = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.json({ success: false, message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed,role });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.json({ success: false, message: 'User not found' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.json({ success: false, message: 'Invalid password' });

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ success: true, token, user });
});

// Wishlist
router.post('/wishlist/:propertyId', async (req, res) => {
  const { userId } = req.body;
  const { propertyId } = req.params;

  const user = await User.findById(userId);
  if (!user) return res.json({ success: false, message: 'User not found' });

  if (user.wishlist.includes(propertyId)) {
    user.wishlist.pull(propertyId);
  } else {
    user.wishlist.push(propertyId);
  }

  await user.save();
  res.json({ success: true, wishlist: user.wishlist });
});

module.exports = router;
