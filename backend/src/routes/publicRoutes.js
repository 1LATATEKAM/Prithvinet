const express = require('express');
const router = express.Router();
const { 
  getPublicPollutionData, 
  getPublicIndustryStatus 
} = require('../controllers/publicController');

router.get('/pollution-data', getPublicPollutionData);
router.get('/industry-status', getPublicIndustryStatus);

module.exports = router;
