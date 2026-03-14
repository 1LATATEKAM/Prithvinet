const PollutionReading = require('../models/PollutionReading');
const MonitoringStation = require('../models/MonitoringStation');

// @desc    Get all pollution readings
// @route   GET /api/pollution
// @access  Public
const getReadings = async (req, res) => {
  try {
    const readings = await PollutionReading.find({})
      .populate('station', 'location_name monitoring_type')
      .sort({ createdAt: -1 });
    res.json(readings);
  } catch (error) {
    console.error("Database error in getReadings:", error.message);
    // Return empty array instead of 500 so UI doesn't break
    res.json([]);
  }

};

// @desc    Create new pollution reading
// @route   POST /api/pollution
// @access  Private
const createReading = async (req, res) => {
  try {
    const { stationId, reading_type, data } = req.body;
    
    const reading = await PollutionReading.create({
      station: stationId,
      reading_type,
      date: new Date(),
      [reading_type.toLowerCase() + '_data']: data,
      submittedBy: req.user._id
    });

    // Update last_reading on station
    await MonitoringStation.findByIdAndUpdate(stationId, { last_reading: new Date() });

    res.status(201).json(reading);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Invalid reading data' });
  }
};

module.exports = {
  getReadings,
  createReading
};
