const express = require('express');
const router = express.Router();
const { 
  getIndustriesForApproval, 
  approveIndustry, 
  createRegionalOfficer 
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);
router.use(authorize('Admin'));

router.get('/industries', getIndustriesForApproval);
router.post('/approve-industry', approveIndustry);
router.post('/create-regional-officer', createRegionalOfficer);

module.exports = router;
