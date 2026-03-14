const aiService = require('../services/aiService');
const MonitoringLog = require('../models/MonitoringLog');
const Industry = require('../models/Industry');

// @desc    Chat with AI Copilot
// @route   POST /api/ai/chat
// @access  Private
const chatWithCopilot = async (req, res) => {
  try {
    const { message } = req.body;
    
    // Fetch some recent context data
    let recentReadings = [];
    try {
      recentReadings = await MonitoringLog.find().sort({ timestamp: -1 }).limit(10);
    } catch (dbError) {
      console.warn("Context data fetch failed (DB Disconnected):", dbError.message);
    }
    
    const analysis = await aiService.analyzeEnvironmentalData(message, { recentReadings });

    res.json({ content: analysis });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Simulate intervention scenario
// @route   POST /api/ai/simulate
// @access  Private
const simulateIntervention = async (req, res) => {
  try {
    const { scenario } = req.body;
    
    // Fetch baseline data
    let baseline = [];
    try {
      baseline = await MonitoringLog.find().sort({ timestamp: -1 }).limit(20);
    } catch (dbError) {
      console.warn("Baseline data fetch failed (DB Disconnected):", dbError.message);
    }
    
    const result = await aiService.simulateScenario(scenario, baseline);

    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get causal graph for a topic
// @route   GET /api/ai/causal-graph
// @access  Private
const getCausalGraph = async (req, res) => {
  try {
    const { topic } = req.query;
    const graph = await aiService.generateCausalGraph(topic || "Industrial Pollution");
    res.json(graph);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  chatWithCopilot,
  simulateIntervention,
  getCausalGraph
};
