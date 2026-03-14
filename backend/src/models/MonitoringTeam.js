const mongoose = require('mongoose');

const monitoringTeamSchema = new mongoose.Schema({
  team_name: {
    type: String,
    required: true,
    unique: true
  },
  regional_officer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('MonitoringTeam', monitoringTeamSchema);
