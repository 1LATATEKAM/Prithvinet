const mongoose = require('mongoose');

const noisePollutionSchema = new mongoose.Schema({
  station_id: { type: String, required: true },
  station_name: { type: String },
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
  noise_db: { type: Number },
  category: { type: String, enum: ['Normal', 'Moderate', 'High'] },
  last_update: { type: Date, default: Date.now },
  timestamp: { type: Date, default: Date.now }
});

noisePollutionSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('NoisePollution', noisePollutionSchema);
