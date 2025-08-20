const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  property: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Schedule", scheduleSchema);

