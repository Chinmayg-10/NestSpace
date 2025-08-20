const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  location: String,
  bedrooms: Number,
  bathrooms: Number,
  type: String,
  images: [String],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Property", propertySchema);

