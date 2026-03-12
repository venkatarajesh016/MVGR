const express = require('express');
const router = express.Router();
const Building = require('../models/Building');
const upload = require('../middleware/upload');

// GET all buildings
router.get('/', async (req, res) => {
  try {
    const buildings = await Building.find();
    res.json(buildings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new building with image upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, lat, lng, description } = req.body;
    
    const building = new Building({
      name,
      coordinates: {
        lat: parseFloat(lat),
        lng: parseFloat(lng)
      },
      description,
      image: req.file ? `/uploads/${req.file.filename}` : null
    });

    const newBuilding = await building.save();
    res.status(201).json(newBuilding);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
