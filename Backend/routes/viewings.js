const express = require('express');
const Viewing = require('../models/Viewing');
const Property = require('../models/Property'); 
const router = express.Router();

// POST /api/viewings
router.post('/', async (req, res) => {
  try {
    const { propertyId, name, email, phone, date, time, message } = req.body;

    if (!propertyId || !name || !email || !date || !time) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Check property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    // Save viewing
    const newViewing = await Viewing.create({
      propertyId,
      propertyTitle: property.title,
      propertyAddress: property.address,
      name,
      email,
      phone,
      date,
      time,
      message
    });

    res.status(201).json({ success: true, data: newViewing });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/viewings (Admin/Owner use case)
router.get('/', async (req, res) => {
  try {
    const viewings = await Viewing.find().populate('propertyId').sort({ createdAt: -1 });
    
    if (!viewings.length) {
      return res.json({ success: true, data: [], message: 'No viewings yet.' });
    }

    res.json({ success: true, data: viewings, total: viewings.length });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;


