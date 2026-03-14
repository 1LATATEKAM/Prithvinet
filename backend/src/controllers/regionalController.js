const User = require('../models/User');
const Industry = require('../models/Industry');
const MonitoringTeam = require('../models/MonitoringTeam');
const RegionalOffice = require('../models/RegionalOffice');

// @desc    Get industries in Regional Officer's jurisdiction
// @route   GET /api/regional/industries
// @access  Private/Regional Officer
const getMyJurisdictionIndustries = async (req, res) => {
  try {
    // Return industries in the RO's assigned region
    const industries = await Industry.find({ 
      district: req.user.region_district // Need to ensure district is accessible
    });
    // Or better, filter by regional_officer_id if assigned
    const assignedIndustries = await Industry.find({ regional_officer_id: req.user._id });
    
    res.json(assignedIndustries);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a monitoring team
// @route   POST /api/regional/create-monitoring-team
// @access  Private/Regional Officer
const createMonitoringTeam = async (req, res) => {
  const { team_name, memberIds } = req.body;

  try {
    const team = await MonitoringTeam.create({
      team_name,
      regional_officer_id: req.user._id,
      members: memberIds
    });

    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

// @desc    Get RO's regional office details
// @route   GET /api/regional/office
// @access  Private/Regional Officer
const getMyRegionalOffice = async (req, res) => {
  try {
    const office = await RegionalOffice.findById(req.user.assigned_region);
    res.json(office);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getMyJurisdictionIndustries,
  createMonitoringTeam,
  getMyRegionalOffice
};
