const mongoose = require('mongoose');

const monitoringCampaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  region: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RegionalOffice'
  },
  start_date: Date,
  end_date: Date,
  targets: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['Planned', 'Ongoing', 'Completed'],
    default: 'Planned'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Campaign', monitoringCampaignSchema);
