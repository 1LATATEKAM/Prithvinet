const express = require('express');
const router = express.Router();
const { 
  submitMonitoringLog, 
  getRecentLogs 
} = require('../controllers/monitoringController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/:type', authorize('Monitoring Team', 'Regional Officer', 'Admin'), submitMonitoringLog);
router.get('/logs', authorize('Admin', 'Regional Officer', 'Monitoring Team'), getRecentLogs);

module.exports = router;
