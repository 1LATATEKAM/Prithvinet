const mongoose = require('mongoose');

const entitySchema = new mongoose.Schema({
  entityName: {
    type: String,
    required: true
  },
  entityType: {
    type: String,
    enum: ['Industry', 'Regional Office', 'Monitoring Agency', 'Laboratory', 'Government Department'],
    required: true
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true
  },
  contactPerson: {
    type: String,
    required: true
  },
  contactEmail: {
    type: String,
    required: true
  },
  contactPhone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
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
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Entity', entitySchema);
