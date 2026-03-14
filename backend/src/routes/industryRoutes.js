const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { 
  createIntimationForm, 
  submitSignedForm,
  getIndustries,
  getIndustryById,
  getMyIndustryProfile
} = require('../controllers/industryController');

// Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

const { protect, authorize } = require('../middleware/authMiddleware');

// Registration Routes (Public)
router.post('/create-form', createIntimationForm);
router.post('/submit-form', upload.fields([
  { name: 'signedForm', maxCount: 1 },
  { name: 'letterhead', maxCount: 1 }
]), submitSignedForm);

// Protected Industry Routes
router.get('/my-profile', protect, authorize('Industry User', 'Admin'), getMyIndustryProfile);

// General Query Routes
router.get('/', protect, getIndustries);
router.get('/:id', protect, getIndustryById);

module.exports = router;
