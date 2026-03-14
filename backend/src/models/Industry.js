const mongoose = require('mongoose');

const industrySchema = new mongoose.Schema({
  // Industry Details
  industryName: { type: String, required: true },
  address: { type: String, required: true },
  productName: { type: String, required: true },
  productActivity: { type: String, required: true },
  productionStartingDate: { type: Date, required: true },
  productionCapacity: { type: String, required: true },
  unit: { type: String, required: true },
  
  // Entity Identification
  entityName: { type: String, required: true },
  entityType: { type: String, required: true },
  incorporationDate: { type: Date, required: true },
  registrationNumber: { type: String, required: true },
  
  // Legal & Statutory
  panNumber: { type: String, required: true },
  gstNumber: { type: String },
  msmeNumber: { type: String },
  licenseNumber: { type: String },
  
  // Contact
  officeAddress: { type: String, required: true },
  operationalAddress: { type: String },
  contactMobile: { type: String, required: true },
  contactEmail: { type: String, required: true },
  alternateNumber: { type: String },
  
  // Owner
  ownerName: { type: String, required: true },
  ownerMobile: { type: String, required: true },
  ownerEmail: { type: String, required: true },
  
  // Jurisdiction
  place: { type: String, required: true },
  district: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  industryType: { 
    type: String, 
    enum: ['Steel plant', 'Sponge iron plant', 'Coal power plant', 'Cement factory', 'Brick kiln', 'Chemical plant', 'Other'],
    default: 'Other'
  },
  emissionFactor: { type: Number, default: 0.5 }, // 0 to 1 scale
  regional_officer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  
  // System Fields
  industryCategory: { type: String, default: 'White' },
  approval_status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  createdAt: { type: Date, default: Date.now }
});

industrySchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Industry', industrySchema);
