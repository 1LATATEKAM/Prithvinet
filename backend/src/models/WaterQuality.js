const mongoose = require('mongoose');

const waterQualitySchema = new mongoose.Schema({
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
  ph_level: { type: Number },
  dissolved_oxygen: { type: Number },
  turbidity: { type: Number },
  contamination_index: { type: Number },
  status: { type: String, enum: ['Safe', 'Moderate', 'Unsafe'] },
  last_update: { type: Date, default: Date.now },
  timestamp: { type: Date, default: Date.now }
});

waterQualitySchema.index({ location: '2dsphere' });

module.exports = mongoose.model('WaterQuality', waterQualitySchema);
