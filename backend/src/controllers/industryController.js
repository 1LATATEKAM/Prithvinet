const Industry = require('../models/Industry');
const IndustryForm = require('../models/IndustryForm');
const { generateWhiteCategoryPDF } = require('../services/pdfService');
const crypto = require('crypto');

// @desc    Get all industries
// @route   GET /api/industries
// @access  Private
const getIndustries = async (req, res) => {
  try {
    const industries = await Industry.find({});
    res.json(industries);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get single industry
// @route   GET /api/industries/:id
// @access  Private
const getIndustryById = async (req, res) => {
  try {
    const industry = await Industry.findById(req.params.id);
    if (industry) {
      res.json(industry);
    } else {
      res.status(404).json({ message: 'Industry not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create an industry
// @route   POST /api/industries
// @access  Private/Admin
const createIndustry = async (req, res) => {
  try {
    const industry = await Industry.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Industry registered successfully',
      data: industry
    });
  } catch (error) {
    res.status(400).json({ message: 'Invalid industry data', error: error.message });
  }
};

// @desc    Update industry
// @route   PUT /api/industries/:id
// @access  Private/Admin
const updateIndustry = async (req, res) => {
  try {
    const industry = await Industry.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after', runValidators: true });
    if (industry) {
      res.json({
        success: true,
        message: 'Industry updated successfully',
        data: industry
      });
    } else {
      res.status(404).json({ message: 'Industry not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid industry data', error: error.message });
  }
};

// @desc    Delete industry
// @route   DELETE /api/industries/:id
// @access  Private/Admin
const deleteIndustry = async (req, res) => {
  try {
    const industry = await Industry.findByIdAndDelete(req.params.id);
    if (industry) {
      res.json({ success: true, message: 'Industry deleted successfully' });
    } else {
      res.status(404).json({ message: 'Industry not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create Industry Intimation Form & Generate PDF
// @route   POST /api/industry/create-form
// @access  Public
const createIntimationForm = async (req, res) => {
  const formData = req.body;
  
  try {
    // Generate Reference Number: WC-YYYYMMDD-XXXXXXXX
    const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const random = crypto.randomBytes(4).toString('hex').toUpperCase();
    const referenceNumber = `WC-${date}-${random}`;

    // Generate PDF
    const pdfBytes = await generateWhiteCategoryPDF(formData, referenceNumber);

    // Create Industry (Pending Approval)
    const industry = await Industry.create({
      ...formData,
      approval_status: 'Pending',
      industryCategory: 'White'
    });

    // Save Form Metadata
    await IndustryForm.create({
      form_reference: referenceNumber,
      industry_id: industry._id,
      form_data: formData,
      status: 'Submitted'
    });

    res.status(201).json({
      success: true,
      referenceNumber,
      industryId: industry._id,
      pdfBase64: Buffer.from(pdfBytes).toString('base64')
    });
  } catch (error) {
    res.status(400).json({ message: 'Form generation failed', error: error.message });
  }
};

// @desc    Submit Signed Official Form
// @route   POST /api/industry/submit-form
// @access  Public
const submitSignedForm = async (req, res) => {
  const { formReference, applicantName, mobile, email, district } = req.body;
  
  try {
    const form = await IndustryForm.findOne({ form_reference: formReference });
    if (!form) {
      return res.status(404).json({ message: 'Invalid Reference Number' });
    }

    // Update form with uploaded file paths (Multer provides these)
    form.status = 'Signed';
    
    // In a real app, we'd save req.files.signedForm[0].path etc.
    if (req.files) {
      if (req.files.signedForm) form.pdf_url = req.files.signedForm[0].path;
      // You could also save additional uploads here
    }

    await form.save();

    res.json({ 
      success: true, 
      message: 'Official form submitted for CECB verification' 
    });
  } catch (error) {
    res.status(500).json({ message: 'Submission failed', error: error.message });
  }
};

// @desc    Get industry profile for logged in user
// @route   GET /api/industry/my-profile
// @access  Private/Industry User
const getMyIndustryProfile = async (req, res) => {
  try {
    const industry = await Industry.findById(req.user.industry_id).populate('regional_officer_id', 'name');
    if (industry) {
      res.json(industry);
    } else {
      res.status(404).json({ message: 'Industry profile not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getIndustries,
  getIndustryById,
  createIndustry,
  updateIndustry,
  deleteIndustry,
  createIntimationForm,
  submitSignedForm,
  getMyIndustryProfile
};
