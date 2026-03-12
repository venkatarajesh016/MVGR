const express = require('express');
const router = express.Router();
const Building = require('../models/Building');
const Room = require('../models/Room');
const Landmark = require('../models/Landmark');
const { generateWalkablePath } = require('../utils/pathfinder');
const { getGraphHopperRoute } = require('../utils/graphhopper');

// Search endpoint
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ message: 'Query parameter is required' });
    }

    const searchRegex = new RegExp(query, 'i');

    const [buildings, rooms, landmarks] = await Promise.all([
      Building.find({ name: searchRegex }),
      Room.find({
        $or: [
          { roomNumber: searchRegex },
          { department: searchRegex }
        ]
      }).populate('buildingId'),
      Landmark.find({ name: searchRegex })
    ]);

    res.json({
      buildings,
      rooms,
      landmarks
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get walkable route between two points
router.get('/route', async (req, res) => {
  try {
    const { startLat, startLng, endLat, endLng, startBuilding, endBuilding, useGraphHopper } = req.query;

    if (!startLat || !startLng || !endLat || !endLng) {
      return res.status(400).json({ message: 'All coordinates are required' });
    }

    let route = null;

    // Try GraphHopper first if requested or API key is available
    if (useGraphHopper !== 'false' && process.env.GRAPHHOPPER_API_KEY && 
        process.env.GRAPHHOPPER_API_KEY !== 'your_graphhopper_api_key_here') {
      route = await getGraphHopperRoute(
        parseFloat(startLat),
        parseFloat(startLng),
        parseFloat(endLat),
        parseFloat(endLng),
        'foot' // Walking profile
      );
    }

    // Fallback to campus walkway pathfinding if GraphHopper fails
    if (!route) {
      console.log('🚶 Using campus walkway pathfinding...');
      route = generateWalkablePath(
        parseFloat(startLat),
        parseFloat(startLng),
        parseFloat(endLat),
        parseFloat(endLng),
        startBuilding,
        endBuilding
      );
    }

    res.json(route);
  } catch (error) {
    console.error('Route error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
