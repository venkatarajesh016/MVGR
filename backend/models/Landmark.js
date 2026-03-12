const mongoose = require('mongoose');

const landmarkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  coordinates: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  },
  image: String,
  description: String
}, { timestamps: true });

module.exports = mongoose.model('Landmark', landmarkSchema);
