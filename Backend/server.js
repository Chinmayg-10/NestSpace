const express = require('express');
const mongoose = require('mongoose');
const cors = require('./middleware/Cors');
require('dotenv').config();

const propertiesRoutes = require('./routes/properties');
const viewingsRoutes = require('./routes/viewings');
const userRoutes=require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB connection failed:', err));

// Middlewares
app.use(cors);
app.use(express.json());

// Routes
app.use('/api/properties', propertiesRoutes);
app.use('/api/viewings', viewingsRoutes);
app.use('/api/user',userRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Real Estate API is running',
    timestamp: new Date().toISOString()
  });
});

// 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Real Estate API Server running on port ${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
});

