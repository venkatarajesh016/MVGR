const mongoose = require('mongoose');

const triggerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  triggerType: {
    type: String,
    enum: ['room_change', 'alert', 'announcement', 'emergency'],
    default: 'announcement'
  },
  targetAudience: {
    type: String,
    enum: ['campus_wide', 'department', 'batch', 'specific_users'],
    default: 'campus_wide'
  },
  department: String,
  batch: String,
  specificUserIds: [mongoose.Schema.Types.ObjectId],
  roomChange: {
    fromRoom: String,
    toRoom: String,
    subject: String
  },
  fromDate: {
    type: Date,
    required: true
  },
  toDate: {
    type: Date,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Trigger', triggerSchema);
