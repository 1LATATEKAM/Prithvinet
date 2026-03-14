const mongoose = require('mongoose');

const industryFormSchema = new mongoose.Schema({
  form_reference: {
    type: String,
    required: true,
    unique: true
  },
  industry_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Industry'
  },
  form_data: {
    type: Object,
    required: true
  },
  pdf_url: {
    type: String
  },
  status: {
    type: String,
    enum: ['Draft', 'Submitted', 'Signed', 'Verified'],
    default: 'Submitted'
  },
  submission_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('IndustryForm', industryFormSchema);
