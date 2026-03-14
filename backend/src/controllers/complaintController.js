const CitizenReport = require('../models/CitizenReport');

// @desc    Create new complaint/report
// @route   POST /api/complaints
// @access  Public
const createComplaint = async (req, res) => {
  try {
    const report = await CitizenReport.create(req.body);
    res.status(201).json(report);
  } catch (error) {
    res.status(400).json({ message: 'Invalid report data' });
  }
};

// @desc    Get all complaints
// @route   GET /api/complaints
// @access  Private/Admin
const getComplaints = async (req, res) => {
  try {
    const reports = await CitizenReport.find({}).sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createComplaint,
  getComplaints
};
