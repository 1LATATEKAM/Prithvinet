const mongoose = require('mongoose');

const waterSourceSchema = new mongoose.Schema({
  sourceName: {
    type: String,
    required: true
  },
  sourceType: {
    type: String,
    enum: ['River', 'Lake', 'Reservoir', 'Groundwater', 'Canal', 'Industrial Effluent Channel'],
    required: true
  },
  region: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true,
    min: -90,
    max: 90
  },
  longitude: {
    type: Number,
    required: true,
    min: -180,
    max: 180
  },
  monitoringParameters: [{
    type: String,
    enum: ['PH', 'Dissolved Oxygen', 'BOD', 'COD', 'Turbidity', 'Temperature', 'Heavy Metals']
  }],
  usageType: {
    type: String,
    enum: ['Drinking', 'Agriculture', 'Industrial', 'Mixed'],
    required: true
  },
  pollutionRiskLevel: {
    type: String,
    enum: ['Low', 'Moderate', 'High'],
    default: 'Low'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('WaterSource', waterSourceSchema);
