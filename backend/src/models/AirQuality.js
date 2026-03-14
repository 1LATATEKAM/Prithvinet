const mongoose = require('mongoose');

const airQualitySchema = new mongoose.Schema({
  station_id: { type: String, required: true },
  station_name: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  aqi: { type: Number },
  pm25: { type: Number },
  pm10: { type: Number },
  no2: { type: Number },
  so2: { type: Number },
  co: { type: Number },
  status: { type: String }, // Good, Satisfactory, Moderate, etc.
  last_update: { type: Date, default: Date.now },
  timestamp: { type: Date, default: Date.now }
});

airQualitySchema.index({ location: '2dsphere' });

module.exports = mongoose.model('AirQuality', airQualitySchema);
