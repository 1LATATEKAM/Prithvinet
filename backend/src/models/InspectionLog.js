const mongoose = require('mongoose');

const inspectionLogSchema = new mongoose.Schema({
  industry: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Industry',
    required: true
  },
  inspection_date: {
    type: Date,
    required: true
  },
  inspector: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  compliance_status: {
    type: String,
    enum: ['Compliant', 'Non-Compliant', 'Action Required'],
    required: true
  },
  violations: [{
    type: String
  }],
  remarks: {
    type: String
  },
  photos: [{
    type: String // URLs to images
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('InspectionLog', inspectionLogSchema);
