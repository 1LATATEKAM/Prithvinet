const mongoose = require('mongoose');

const citizenReportSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  pollution_type: {
    type: String,
    enum: ['Air', 'Water', 'Noise', 'Waste', 'Other'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  photos: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['Reported', 'Under Investigation', 'Resolved'],
    default: 'Reported'
  },
  reporterName: String,
  reporterContact: String,
  date_time: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CitizenReport', citizenReportSchema);
