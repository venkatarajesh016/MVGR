const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Timetable = require('../models/Timetable');

// GET /api/timetable - Get user's timetable
router.get('/', auth, async (req, res) => {
  try {
    let timetable = await Timetable.findOne({ userId: req.user._id });

    // If no timetable exists, create an empty one
    if (!timetable) {
      timetable = new Timetable({
        userId: req.user._id,
        campusId: 'main-campus',
        semester: 'Spring 2024',
        entries: []
      });
      await timetable.save();
    }

    res.json({ timetable });
  } catch (error) {
    console.error('Get timetable error:', error);
    res.status(500).json({ message: 'Server error fetching timetable' });
  }
});

// POST /api/timetable - Create new timetable
router.post('/', auth, async (req, res) => {
  try {
    const { semester, entries } = req.body;

    // Check if timetable already exists
    let timetable = await Timetable.findOne({ userId: req.user._id });

    if (timetable) {
      return res.status(400).json({ message: 'Timetable already exists for this user' });
    }

    timetable = new Timetable({
      userId: req.user._id,
      campusId: 'main-campus',
      semester: semester || 'Spring 2024',
      entries: entries || []
    });

    await timetable.save();

    res.status(201).json({
      message: 'Timetable created successfully',
      timetable
    });
  } catch (error) {
    console.error('Create timetable error:', error);
    res.status(500).json({ message: 'Server error creating timetable' });
  }
});

// PUT /api/timetable - Update timetable entries
router.put('/', auth, async (req, res) => {
  try {
    const { entries, semester } = req.body;

    let timetable = await Timetable.findOne({ userId: req.user._id });

    if (!timetable) {
      // Create new timetable if it doesn't exist
      timetable = new Timetable({
        userId: req.user._id,
        campusId: 'main-campus',
        semester: semester || 'Spring 2024',
        entries: entries || []
      });
    } else {
      // Update existing timetable
      if (entries) {
        timetable.entries = entries;
      }
      if (semester) {
        timetable.semester = semester;
      }
    }

    timetable.updatedAt = new Date();
    await timetable.save();

    res.json({
      message: 'Timetable updated successfully',
      timetable
    });
  } catch (error) {
    console.error('Update timetable error:', error);
    res.status(500).json({ message: 'Server error updating timetable' });
  }
});

// DELETE /api/timetable/:entryId - Delete a timetable entry
router.delete('/:entryId', auth, async (req, res) => {
  try {
    const timetable = await Timetable.findOne({ userId: req.user._id });

    if (!timetable) {
      return res.status(404).json({ message: 'Timetable not found' });
    }

    // Remove the entry
    timetable.entries = timetable.entries.filter(
      entry => entry._id.toString() !== req.params.entryId
    );

    await timetable.save();

    res.json({
      message: 'Timetable entry deleted successfully',
      timetable
    });
  } catch (error) {
    console.error('Delete timetable entry error:', error);
    res.status(500).json({ message: 'Server error deleting timetable entry' });
  }
});

// GET /api/timetable/day/:day - Get classes for a specific day
router.get('/day/:day', auth, async (req, res) => {
  try {
    const timetable = await Timetable.findOne({ userId: req.user._id });

    if (!timetable) {
      return res.status(404).json({ message: 'Timetable not found' });
    }

    const dayClasses = timetable.entries.filter(entry => entry.day === req.params.day);

    res.json({ classes: dayClasses });
  } catch (error) {
    console.error('Get day classes error:', error);
    res.status(500).json({ message: 'Server error fetching day classes' });
  }
});

module.exports = router;
