const express = require('express');
const router = express.Router();
const { chatWithCopilot, simulateIntervention, getCausalGraph } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/chat', protect, chatWithCopilot);
router.post('/simulate', protect, simulateIntervention);
router.get('/causal-graph', protect, getCausalGraph);

module.exports = router;
