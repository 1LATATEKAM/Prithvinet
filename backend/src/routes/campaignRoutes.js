const express = require('express');
const router = express.Router();
const { createCampaign, getCampaigns, updateCampaign } = require('../controllers/campaignController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, authorize('Admin', 'Regional Officer'), createCampaign)
  .get(protect, getCampaigns);

router.route('/:id')
  .put(protect, authorize('Admin', 'Regional Officer'), updateCampaign);

module.exports = router;
