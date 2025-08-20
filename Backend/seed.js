const mongoose = require("mongoose");
const Property = require("./models/Property"); // Make sure you have a Property model
require("dotenv").config();

const properties = [
  {
  title: "Luxury Apartment in Downtown",
  location: "New York",
  type: "Apartment",
  bedrooms: 3,
  bathrooms: 2,
  price: 250000,
  description: "A luxurious apartment in the heart of New York City, close to all amenities.",
  images: [
    "https://th.bing.com/th/id/OIP.oBNcKJf_wfJ_4doIkIjyTwHaEp?w=315&h=198&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    "https://th.bing.com/th/id/OIP.cTQfz3AemJvapRyHhmEQBwHaEp?w=260&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
  ],
},
  {
    title: "Cozy Villa with Garden",
    location: "Los Angeles",
    type: "Villa",
    bedrooms: 4,
    bathrooms: 3,
    price: 450000,
    description: "Beautiful villa with a private garden and pool, perfect for families.",
    images: [
      "https://th.bing.com/th?id=OIF.8SK7FJ9sB48sOmqO6R%2bBWA&w=285&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
      "https://tse3.mm.bing.net/th/id/OIP.QCTlEeC8idefDTDWNdCwngHaEK?rs=1&pid=ImgDetMain&o=7&rm=3"
    ],
  },
  {
    title: "Modern House in Suburbs",
    location: "Chicago",
    type: "House",
    bedrooms: 3,
    bathrooms: 2,
    price: 300000,
    description: "A modern suburban house with all modern amenities and a spacious backyard.",
    images: [
      "https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2015/7/1/0/CI-Valspar_ivory-white-and-aqua-home-exterior.jpg.rend.hgtvcom.1280.960.suffix/1435775517689.jpeg",
      "https://tse4.mm.bing.net/th/id/OIP.YLLwQcx0N8rB05LB_RVvHQHaHE?w=555&h=530&rs=1&pid=ImgDetMain&o=7&rm=3"
    ],
  },
  {
    title: "Penthouse Apartment with Terrace",
    location: "New York",
    type: "Apartment",
    bedrooms: 5,
    bathrooms: 4,
    price: 800000,
    description: "Exclusive penthouse with a large terrace and panoramic city views.",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
    ],
  },
  {
    title: "Beachfront Villa",
    location: "Miami",
    type: "Villa",
    bedrooms: 4,
    bathrooms: 3,
    price: 1200000,
    description: "Villa located right on the beach with stunning sea views.",
    images: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
    ],
  },
  {
    title: "Suburban Family Home",
    location: "Dallas",
    type: "House",
    bedrooms: 3,
    bathrooms: 2,
    price: 280000,
    description: "Perfect family home in a quiet suburban neighborhood.",
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
    ],
  },
  {
    title: "Downtown Loft Apartment",
    location: "San Francisco",
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 1,
    price: 350000,
    description: "Stylish loft in downtown San Francisco with modern finishes.",
    images: [
      "https://th.bing.com/th/id/OIP.lySgIJYWmcYDZhm5WaDy7AHaEK?w=225&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
      "https://th.bing.com/th/id/OIP.eHyb_F0NlP-HCtHCCxfMfQHaEJ?w=266&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
    ],
  },
  {
    title: "Countryside Cottage",
    location: "Vermont",
    type: "House",
    bedrooms: 2,
    bathrooms: 1,
    price: 150000,
    description: "Charming cottage surrounded by nature, ideal for peaceful living.",
    images: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
    ],
  },
  {
    title: "Modern Beach House",
    location: "Los Angeles",
    type: "House",
    bedrooms: 3,
    bathrooms: 2,
    price: 600000,
    description: "A modern beach house with open living spaces and ocean views.",
    images: [
      "https://th.bing.com/th/id/OIP.AncaJJB-a3rw0_38eQ0n7AHaE8?w=240&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
      "https://th.bing.com/th/id/OIP.bx28sdhBROAfINoD7rNZFgHaEK?w=286&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
    ],
  },
  {
    title: "Urban Studio Apartment",
    location: "New York",
    type: "Apartment",
    bedrooms: 1,
    bathrooms: 1,
    price: 180000,
    description: "Compact studio apartment in the city center, ideal for singles or couples.",
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1560184897-eed3b0e0f8d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
    ],
  }
];

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("MongoDB connected");

    // Clear existing properties
    await Property.deleteMany({});
    console.log("Existing properties removed");

    // Insert sample properties
    await Property.insertMany(properties);
    console.log("Sample properties added");

    process.exit();
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });


