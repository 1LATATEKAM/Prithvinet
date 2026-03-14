const mongoose = require('mongoose');

const pollutionReadingSchema = new mongoose.Schema({
  station: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MonitoringStation'
  },
  source: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WaterSource'
  },
  industry: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Industry'
  },
  reading_type: {
    type: String,
    enum: ['Air', 'Water', 'Noise'],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String
  },
  // Air Parameters
  air_data: {
    pm25: Number,
    pm10: Number,
    so2: Number,
    nox: Number,
    co: Number,
    ozone: Number,
    temperature: Number,
    humidity: Number
  },
  // Water Parameters
  water_data: {
    ph: Number,
    dissolved_oxygen: Number,
    bod: Number,
    cod: Number,
    turbidity: Number
  },
  // Noise Parameters
  noise_data: {
    average_db: Number,
    peak_db: Number
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('PollutionReading', pollutionReadingSchema);
