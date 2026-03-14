const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Admin', 'Regional Officer', 'Monitoring Team', 'Industry User'],
    default: 'Industry User'
  },
  assigned_region: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RegionalOffice'
  },
  industry_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Industry'
  },
  approved_status: {
    type: Boolean,
    default: false
  },
  region: { // Keeping this just in case, but assigned_region is better
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RegionalOffice'
  },
  officeId: {
    type: String
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Suspended'],
    default: 'Active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
