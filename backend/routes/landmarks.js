const express = require('express');
const router = express.Router();
const Landmark = require('../models/Landmark');
const upload = require('../middleware/upload');

// GET all landmarks
router.get('/', async (req, res) => {
  try {
    const landmarks = await Landmark.find();
    res.json(landmarks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new landmark with image upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, lat, lng, description } = req.body;
    
    const landmark = new Landmark({
      name,
      coordinates: {
        lat: parseFloat(lat),
        lng: parseFloat(lng)
      },
      description,
      image: req.file ? `/uploads/${req.file.filename}` : null
    });

    const newLandmark = await landmark.save();
    res.status(201).json(newLandmark);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
