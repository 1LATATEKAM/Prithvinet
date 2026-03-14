const express = require('express');
const router = express.Router();
const { getStations, getStationById, createStation, updateStation, deleteStation } = require('../controllers/stationController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getStations)
  .post(protect, authorize('Admin'), createStation);

router.route('/:id')
  .get(protect, getStationById)
  .put(protect, authorize('Admin'), updateStation)
  .delete(protect, authorize('Admin'), deleteStation);


module.exports = router;
