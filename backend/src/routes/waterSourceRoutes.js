const express = require('express');
const router = express.Router();
const { 
  getWaterSources, 
  getWaterSourceById,
  createWaterSource, 
  updateWaterSource,
  deleteWaterSource
} = require('../controllers/waterSourceController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getWaterSources)
  .post(protect, authorize('Admin'), createWaterSource);

router.route('/:id')
  .get(protect, getWaterSourceById)
  .put(protect, authorize('Admin'), updateWaterSource)
  .delete(protect, authorize('Admin'), deleteWaterSource);

module.exports = router;
