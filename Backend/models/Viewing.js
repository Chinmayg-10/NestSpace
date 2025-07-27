const mongoose = require('mongoose');

const viewingSchema = new mongoose.Schema({
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  propertyTitle: String,            // ✅ Add this
  propertyAddress: String,          // ✅ Add this
  name: String,
  email: String,
  phone: String,
  date: String,
  time: String,
  message: String,
  status: { type: String, default: 'scheduled' },
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Viewing', viewingSchema);


