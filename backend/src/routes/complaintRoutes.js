const express = require('express');
const router = express.Router();
const { createComplaint, getComplaints } = require('../controllers/complaintController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, authorize('Admin', 'Regional Officer'), getComplaints)
  .post(createComplaint);

module.exports = router;
