const User = require('../models/User');
const Industry = require('../models/Industry');
const IndustryForm = require('../models/IndustryForm');

// @desc    Get all industries pending approval
// @route   GET /api/admin/industries
// @access  Private/Admin
const getIndustriesForApproval = async (req, res) => {
  try {
    const industries = await Industry.find({ approval_status: 'Pending' }).populate('regional_officer_id', 'name');
    res.json(industries);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Approve or Reject industry registration
// @route   POST /api/admin/approve-industry
// @access  Private/Admin
const approveIndustry = async (req, res) => {
  const { industryId, status, regionalOfficerId } = req.body;

  try {
    const industry = await Industry.findById(industryId);
    if (!industry) {
      return res.status(404).json({ message: 'Industry not found' });
    }

    industry.approval_status = status;
    if (regionalOfficerId) {
      industry.regional_officer_id = regionalOfficerId;
    }
    await industry.save();

    // If approved, create/reset the Industry User account associated with this industry
    if (status === 'Approved') {
      let user = await User.findOne({ industry_id: industryId });
      const defaultPassword = `Prithvi@${Math.floor(1000 + Math.random() * 9000)}`;

      if (!user) {
        user = await User.create({
          name: industry.industryName,
          email: industry.contactEmail,
          password: defaultPassword,
          role: 'Industry User',
          industry_id: industryId,
          approved_status: true,
          status: 'Active'
        });
      } else {
        user.password = defaultPassword;
        user.approved_status = true;
        user.status = 'Active';
        await user.save();
      }

      return res.json({ 
        success: true,
        message: `Credentials ${user ? 'regenerated' : 'generated'} successfully.`,
        credentials: {
          email: industry.contactEmail,
          temporaryPassword: defaultPassword
        },
        industry
      });
    }

    res.json({ success: true, message: `Industry ${status} successfully`, industry });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create/Authorize Regional Officer
// @route   POST /api/admin/create-regional-officer
// @access  Private/Admin
const createRegionalOfficer = async (req, res) => {
  const { name, email, password, assigned_region } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already authorized' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: 'Regional Officer',
      assigned_region,
      approved_status: true,
      status: 'Active'
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      assigned_region: user.assigned_region
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

module.exports = {
  getIndustriesForApproval,
  approveIndustry,
  createRegionalOfficer
};
