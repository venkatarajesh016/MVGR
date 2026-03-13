const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const Trigger = require('../models/Trigger');
const User = require('../models/User');
const nodemailer = require('nodemailer');

// Configure email transporter (using Ethereal for dev, Gmail for production)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
  port: process.env.EMAIL_PORT || 587,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Helper function to send email
const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@campusnavigation.com',
      to,
      subject,
      html
    });
  } catch (error) {
    console.error('Email send error:', error);
  }
};

// Helper function to get recipients based on target audience
const getRecipients = async (trigger) => {
  let recipients = [];

  if (trigger.targetAudience === 'campus_wide') {
    recipients = await User.find({ role: { $in: ['student', 'teacher'] } });
  } else if (trigger.targetAudience === 'department') {
    recipients = await User.find({ 
      department: trigger.department,
      role: { $in: ['student', 'teacher'] }
    });
  } else if (trigger.targetAudience === 'batch') {
    recipients = await User.find({ 
      batch: trigger.batch,
      role: 'student'
    });
  } else if (trigger.targetAudience === 'specific_users') {
    recipients = await User.find({ _id: { $in: trigger.specificUserIds } });
  }

  return recipients;
};

// POST /api/triggers - Create trigger (admin/teacher only)
router.post('/', auth, roleCheck(['admin', 'teacher']), async (req, res) => {
  try {
    const { title, message, triggerType, targetAudience, department, batch, 
            specificUserIds, roomChange, fromDate, toDate } = req.body;

    // Validate required fields
    if (!title || !message || !fromDate || !toDate) {
      return res.status(400).json({ message: 'Title, message, fromDate, and toDate are required' });
    }

    // Create trigger
    const trigger = new Trigger({
      title,
      message,
      triggerType: triggerType || 'announcement',
      targetAudience: targetAudience || 'campus_wide',
      department,
      batch,
      specificUserIds,
      roomChange,
      fromDate: new Date(fromDate),
      toDate: new Date(toDate),
      createdBy: req.user._id
    });

    await trigger.save();
    await trigger.populate('createdBy', 'name email role');

    // Get recipients and send emails
    const recipients = await getRecipients(trigger);
    
    recipients.forEach(recipient => {
      const emailHtml = `
        <h2>${trigger.title}</h2>
        <p>${trigger.message}</p>
        ${trigger.roomChange ? `
          <p><strong>Room Change:</strong> ${trigger.roomChange.fromRoom} → ${trigger.roomChange.toRoom}</p>
          ${trigger.roomChange.subject ? `<p><strong>Subject:</strong> ${trigger.roomChange.subject}</p>` : ''}
        ` : ''}
        <p><small>Valid until: ${new Date(trigger.toDate).toLocaleString()}</small></p>
      `;
      
      sendEmail(recipient.email, trigger.title, emailHtml);
    });

    // Emit Socket.io event
    const io = req.app.get('io');
    if (targetAudience === 'campus_wide') {
      io.emit('new-trigger', trigger);
    } else if (targetAudience === 'department') {
      io.to(`campus-${department}`).emit('new-trigger', trigger);
    } else if (targetAudience === 'specific_users') {
      specificUserIds.forEach(userId => {
        io.to(`student-${userId}`).emit('new-trigger', trigger);
      });
    }

    res.status(201).json({
      message: 'Trigger created successfully',
      trigger
    });
  } catch (error) {
    console.error('Create trigger error:', error);
    res.status(500).json({ message: 'Server error creating trigger' });
  }
});

// GET /api/triggers - Get active triggers
router.get('/', async (req, res) => {
  try {
    const now = new Date();
    
    const triggers = await Trigger.find({
      isActive: true,
      fromDate: { $lte: now },
      toDate: { $gte: now }
    })
    .populate('createdBy', 'name email role')
    .sort({ createdAt: -1 });

    res.json({ triggers });
  } catch (error) {
    console.error('Get triggers error:', error);
    res.status(500).json({ message: 'Server error fetching triggers' });
  }
});

// GET /api/triggers/:id - Get single trigger
router.get('/:id', async (req, res) => {
  try {
    const trigger = await Trigger.findById(req.params.id)
      .populate('createdBy', 'name email role');

    if (!trigger) {
      return res.status(404).json({ message: 'Trigger not found' });
    }

    res.json({ trigger });
  } catch (error) {
    console.error('Get trigger error:', error);
    res.status(500).json({ message: 'Server error fetching trigger' });
  }
});

// PUT /api/triggers/:id - Update trigger (admin/teacher only)
router.put('/:id', auth, roleCheck(['admin', 'teacher']), async (req, res) => {
  try {
    const trigger = await Trigger.findById(req.params.id);

    if (!trigger) {
      return res.status(404).json({ message: 'Trigger not found' });
    }

    // Check authorization
    if (trigger.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this trigger' });
    }

    // Update fields
    const { title, message, triggerType, targetAudience, department, batch, 
            specificUserIds, roomChange, fromDate, toDate, isActive } = req.body;

    if (title) trigger.title = title;
    if (message) trigger.message = message;
    if (triggerType) trigger.triggerType = triggerType;
    if (targetAudience) trigger.targetAudience = targetAudience;
    if (department) trigger.department = department;
    if (batch) trigger.batch = batch;
    if (specificUserIds) trigger.specificUserIds = specificUserIds;
    if (roomChange) trigger.roomChange = roomChange;
    if (fromDate) trigger.fromDate = new Date(fromDate);
    if (toDate) trigger.toDate = new Date(toDate);
    if (isActive !== undefined) trigger.isActive = isActive;

    trigger.updatedAt = new Date();
    await trigger.save();
    await trigger.populate('createdBy', 'name email role');

    res.json({
      message: 'Trigger updated successfully',
      trigger
    });
  } catch (error) {
    console.error('Update trigger error:', error);
    res.status(500).json({ message: 'Server error updating trigger' });
  }
});

// DELETE /api/triggers/:id - Delete trigger (admin only)
router.delete('/:id', auth, roleCheck(['admin']), async (req, res) => {
  try {
    const trigger = await Trigger.findByIdAndDelete(req.params.id);

    if (!trigger) {
      return res.status(404).json({ message: 'Trigger not found' });
    }

    res.json({ message: 'Trigger deleted successfully' });
  } catch (error) {
    console.error('Delete trigger error:', error);
    res.status(500).json({ message: 'Server error deleting trigger' });
  }
});

// PUT /api/triggers/:id/deactivate - Deactivate trigger
router.put('/:id/deactivate', async (req, res) => {
  try {
    const trigger = await Trigger.findByIdAndUpdate(
      req.params.id,
      { isActive: false, updatedAt: new Date() },
      { new: true }
    ).populate('createdBy', 'name email role');

    if (!trigger) {
      return res.status(404).json({ message: 'Trigger not found' });
    }

    res.json({
      message: 'Trigger deactivated successfully',
      trigger
    });
  } catch (error) {
    console.error('Deactivate trigger error:', error);
    res.status(500).json({ message: 'Server error deactivating trigger' });
  }
});

module.exports = router;
