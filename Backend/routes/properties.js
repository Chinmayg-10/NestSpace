const express = require("express");
const router = express.Router();
const Property = require("../models/Property");
const User = require("../models/User"); // For wishlist

// 1️⃣ Add Property
router.post("/", async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();
    res.status(201).json({ success: true, data: property });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 2️⃣ Get all properties
router.get("/", async (req, res) => {
  try {
    const properties = await Property.find();
    res.json({ data: properties });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 3️⃣ Get properties by owner
router.get("/owner/:userId", async (req, res) => {
  try {
    const properties = await Property.find({ ownerId: req.params.userId });
    res.json({ data: properties });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 4️⃣ Delete a property
router.delete("/:id", async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 5️⃣ Toggle Wishlist
router.post("/wishlist/:propertyId", async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);

    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    const propertyId = req.params.propertyId;

    if (user.wishlist.includes(propertyId)) {
      user.wishlist = user.wishlist.filter((id) => id.toString() !== propertyId);
    } else {
      user.wishlist.push(propertyId);
    }

    await user.save();
    res.json({ success: true, wishlist: user.wishlist });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;



