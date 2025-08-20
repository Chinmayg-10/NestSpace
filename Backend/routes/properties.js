const express = require("express");
const router = express.Router();
const mongoose=require("mongoose")
const Property = require("../models/Property");
const authMiddleware = require("../middleware/authMiddleware");
const Schedule=require("../models/ScheduleVisit")

// Get all properties with optional filters
router.get("/", async (req, res) => {
  try {
    const { location, minPrice, maxPrice, bedrooms, type } = req.query;
    let query = {};
    if (location) query.location = location;
    if (bedrooms) query.bedrooms = Number(bedrooms);
    if (type) query.type = type;
    if (minPrice || maxPrice) query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);

    const properties = await Property.find(query);
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch properties", error: error.message });
  }
});

// Get single property (protected)
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch property", error: error.message });
  }
});

// Create property (protected)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const property = await Property.create(req.body);
    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ message: "Failed to create property", error: error.message });
  }
});

// Add/remove wishlist (protected)
router.post("/:id/wishlist", authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    const propertyId = req.params.id;

    if (!user || !user.wishlist) {
      return res.status(400).json({ message: "User data invalid" });
    }

    const index = user.wishlist.indexOf(propertyId);
    if (index > -1) {
      user.wishlist.splice(index, 1); // Remove from wishlist
    } else {
      user.wishlist.push(propertyId); // Add to wishlist
    }
    await user.save();
    res.status(200).json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: "Failed to update wishlist", error: error.message });
  }
});
// Schedule a visit
router.post("/:id/schedule-visit",authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { date, time } = req.body;
  const userId = req.user?._id; 
  if (!date || !time) {
    return res.status(400).json({ message: "Date and time are required." });
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid property ID." });
  }
  try {
    // Save schedule in DB
    const schedule = await Schedule.create({
      user: userId,
      property: id,
      date,
      time,
    });

    res.status(201).json({ message: "Visit scheduled successfully", schedule });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
