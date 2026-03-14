const Campaign = require('../models/Campaign');

// @desc    Create a new monitoring campaign
// @route   POST /api/campaigns
// @access  Private (Admin, Regional Officer)
const createCampaign = async (req, res) => {
  try {
    const { name, region, start_date, end_date, targets } = req.body;

    const campaign = await Campaign.create({
      name,
      region: region || req.user.region,
      start_date,
      end_date,
      targets
    });

    res.status(201).json(campaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all campaigns (filtered by region for Regional Officer)
// @route   GET /api/campaigns
// @access  Private
const getCampaigns = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'Regional Officer') {
      query.region = req.user.region;
    }

    const campaigns = await Campaign.find(query).populate('region', 'name');
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update campaign status
// @route   PUT /api/campaigns/:id
// @access  Private (Admin, Regional Officer)
const updateCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (campaign) {
      campaign.status = req.body.status || campaign.status;
      const updatedCampaign = await campaign.save();
      res.json(updatedCampaign);
    } else {
      res.status(404).json({ message: 'Campaign not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createCampaign, getCampaigns, updateCampaign };
