const WaterSource = require('../models/WaterSource');

// @desc    Get all water sources
// @route   GET /api/water-sources
// @access  Public
const getWaterSources = async (req, res) => {
  try {
    const sources = await WaterSource.find({});
    res.json(sources);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getWaterSourceById = async (req, res) => {
  try {
    const source = await WaterSource.findById(req.params.id);
    if (source) {
      res.json(source);
    } else {
      res.status(404).json({ message: 'Water source not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createWaterSource = async (req, res) => {
  try {
    const source = await WaterSource.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Water source registered successfully',
      data: source
    });
  } catch (error) {
    res.status(400).json({ message: 'Invalid water source data', error: error.message });
  }
};

const updateWaterSource = async (req, res) => {
  try {
    const source = await WaterSource.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after', runValidators: true });
    if (source) {
      res.json({
        success: true,
        message: 'Water source updated successfully',
        data: source
      });
    } else {
      res.status(404).json({ message: 'Water source not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid water source data', error: error.message });
  }
};

const deleteWaterSource = async (req, res) => {
  try {
    const source = await WaterSource.findByIdAndDelete(req.params.id);
    if (source) {
      res.json({ success: true, message: 'Water source deleted successfully' });
    } else {
      res.status(404).json({ message: 'Water source not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getWaterSources,
  getWaterSourceById,
  createWaterSource,
  updateWaterSource,
  deleteWaterSource
};

