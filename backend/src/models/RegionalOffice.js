const mongoose = require('mongoose');

const regionalOfficeSchema = new mongoose.Schema({
  office_name: {
    type: String,
    required: true,
    unique: true
  },
  district: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  office_head: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('RegionalOffice', regionalOfficeSchema);
