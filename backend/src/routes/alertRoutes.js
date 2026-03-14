const express = require('express');
const router = express.Router();
const { getAlerts, updateAlertStatus, createAlert } = require('../controllers/alertController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getAlerts)
  .post(protect, createAlert);

router.route('/:id/status')
  .patch(protect, authorize('Admin', 'Regional Officer'), updateAlertStatus);

module.exports = router;
