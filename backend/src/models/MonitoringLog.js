const mongoose = require('mongoose');

const monitoringLogSchema = new mongoose.Schema({
  monitoring_type: {
    type: String,
    enum: ['Air', 'Water', 'Noise'],
    required: true
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    },
    address: String
  },
  value: {
    type: Map,
    of: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  submitted_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  region: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RegionalOffice'
  },
  remarks: String
});

monitoringLogSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('MonitoringLog', monitoringLogSchema);
