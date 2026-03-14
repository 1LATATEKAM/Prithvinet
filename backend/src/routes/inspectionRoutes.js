const express = require('express');
const router = express.Router();
const { submitInspection, getInspections } = require('../controllers/inspectionController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, authorize('Monitoring Team', 'Admin'), submitInspection)
  .get(protect, getInspections);

module.exports = router;
