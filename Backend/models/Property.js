// models/Property.js
const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: String,
  address: String,
  price: Number,
  type: { type: String, enum: ["rent", "sale"] },
  bedrooms: Number,
  bathrooms: Number,
  sqft: Number,
  image: String,
  description: String,
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }

});

module.exports = mongoose.model("Property", propertySchema);

