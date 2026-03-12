const express = require('express');
const router = express.Router();
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const Building = require('../models/Building');
const Room = require('../models/Room');

const upload = multer({ dest: 'uploads/temp/' });

// Upload CSV file
router.post('/upload-csv', upload.single('csv'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const results = [];
    const filePath = req.file.path;

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        try {
          // Process buildings
          const buildings = results.filter(row => row.type === 'building');
          for (const b of buildings) {
            await Building.create({
              name: b.name,
              coordinates: {
                lat: parseFloat(b.lat),
                lng: parseFloat(b.lng)
              },
              description: b.description || ''
            });
          }

          // Process rooms
          const rooms = results.filter(row => row.type === 'room');
          for (const r of rooms) {
            const building = await Building.findOne({ name: r.buildingName });
            if (building) {
              await Room.create({
                roomNumber: r.roomNumber,
                buildingId: building._id,
                floor: parseInt(r.floor),
                department: r.department || '',
                coordinates: {
                  lat: parseFloat(r.lat),
                  lng: parseFloat(r.lng)
                }
              });
            }
          }

          // Clean up temp file
          fs.unlinkSync(filePath);

          res.json({
            message: 'CSV imported successfully',
            buildingsCount: buildings.length,
            roomsCount: rooms.length
          });
        } catch (error) {
          fs.unlinkSync(filePath);
          res.status(500).json({ message: error.message });
        }
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
