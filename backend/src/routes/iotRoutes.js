const express = require('express');
const router = express.Router();
const { getLatestSensorData } = require('../controllers/iotController');

console.log('--- Initializing IoT Routes ---');
router.get('/latest', getLatestSensorData);

module.exports = router;
