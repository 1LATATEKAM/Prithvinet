const Industry = require('../models/Industry');
const MonitoringLog = require('../models/MonitoringLog');
const MonitoringStation = require('../models/MonitoringStation');

// @desc    Get real-time monitoring data for public maps
// @route   GET /api/public/pollution-data
const getPublicPollutionData = async (req, res) => {
  try {
    const airLogs = await MonitoringLog.find({ monitoring_type: 'Air' }).sort({ timestamp: -1 }).limit(20);
    const waterLogs = await MonitoringLog.find({ monitoring_type: 'Water' }).sort({ timestamp: -1 }).limit(20);
    const noiseLogs = await MonitoringLog.find({ monitoring_type: 'Noise' }).sort({ timestamp: -1 }).limit(20);
    
    // Also include active monitoring stations
    const stations = await MonitoringStation.find({ status: 'Active' });

    res.json({
      air: airLogs,
      water: waterLogs,
      noise: noiseLogs,
      stations
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get compliance snapshots of industries
// @route   GET /api/public/industry-status
const getPublicIndustryStatus = async (req, res) => {
  try {
    const stats = await Industry.aggregate([
      { $match: { approval_status: 'Approved' } },
      { $group: { 
          _id: '$consentStatus', 
          count: { $sum: 1 } 
      }}
    ]);
    
    const sampleIndustries = await Industry.find({ approval_status: 'Approved' })
      .select('industryName industryType district consentStatus');

    res.json({ stats, sampleIndustries });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getPublicPollutionData,
  getPublicIndustryStatus
};
