const mongoose = require('mongoose');

const timetableEntrySchema = new mongoose.Schema({
    day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    subject: { type: String, required: true },
    roomCode: { type: String, required: true },
    buildingCode: { type: String },
    floor: { type: Number }
});

const timetableSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    campusId: { type: String, required: true },
    semester: { type: String },
    entries: [timetableEntrySchema],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Timetable', timetableSchema);
