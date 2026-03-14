const express = require('express');
const router = express.Router();
const { getReadings, createReading } = require('../controllers/pollutionController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getReadings)
  .post(protect, createReading);

module.exports = router;
