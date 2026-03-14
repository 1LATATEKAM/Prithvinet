const InspectionLog = require('../models/InspectionLog');
const Industry = require('../models/Industry');

// @desc    Submit industrial inspection log
// @route   POST /api/inspections
// @access  Private (Monitoring Team / Field Inspector)
const submitInspection = async (req, res) => {
  try {
    const { industry, inspection_date, compliance_status, violations, remarks, photos } = req.body;

    const inspection = await InspectionLog.create({
      industry,
      inspection_date,
      inspector: req.user._id,
      compliance_status,
      violations,
      remarks,
      photos
    });

    // Update industry status based on inspection
    await Industry.findByIdAndUpdate(industry, { status: compliance_status });

    res.status(201).json(inspection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get inspections
// @route   GET /api/inspections
// @access  Private
const getInspections = async (req, res) => {
  try {
    let query = {};
    
    // Filter by role
    if (req.user.role === 'Monitoring Team') {
      query.inspector = req.user._id;
    } else if (req.user.role === 'Regional Officer') {
      // Find industries in this region first
      const industries = await Industry.find({ region: req.user.region }).select('_id');
      const industryIds = industries.map(ind => ind._id);
      query.industry = { $in: industryIds };
    }

    const inspections = await InspectionLog.find(query)
      .populate('industry', 'industry_name')
      .populate('inspector', 'name');
    
    res.json(inspections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { submitInspection, getInspections };
