const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

// GET all rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find().populate('buildingId');
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new room
router.post('/', async (req, res) => {
  try {
    const { roomNumber, buildingId, floor, department, lat, lng } = req.body;
    
    const room = new Room({
      roomNumber,
      buildingId,
      floor: parseInt(floor),
      department,
      coordinates: {
        lat: parseFloat(lat),
        lng: parseFloat(lng)
      }
    });

    const newRoom = await room.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
