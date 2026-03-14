const Entity = require('../models/Entity');

const getEntities = async (req, res) => {
  try {
    const entities = await Entity.find({});
    res.json(entities);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getEntityById = async (req, res) => {
  try {
    const entity = await Entity.findById(req.params.id);
    if (entity) {
      res.json(entity);
    } else {
      res.status(404).json({ message: 'Entity not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createEntity = async (req, res) => {
  try {
    const entity = await Entity.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Entity created successfully',
      data: entity
    });
  } catch (error) {
    res.status(400).json({ message: 'Invalid entity data', error: error.message });
  }
};

const updateEntity = async (req, res) => {
  try {
    const entity = await Entity.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after', runValidators: true });
    if (entity) {
      res.json({
        success: true,
        message: 'Entity updated successfully',
        data: entity
      });
    } else {
      res.status(404).json({ message: 'Entity not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid entity data', error: error.message });
  }
};

const deleteEntity = async (req, res) => {
  try {
    const entity = await Entity.findByIdAndDelete(req.params.id);
    if (entity) {
      res.json({ success: true, message: 'Entity deleted successfully' });
    } else {
      res.status(404).json({ message: 'Entity not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getEntities,
  getEntityById,
  createEntity,
  updateEntity,
  deleteEntity
};
