const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    console.log('Server will continue running, but database features will be unavailable.');
    // process.exit(1); // commented out to allow frontend development without local DB
  }
};

module.exports = connectDB;

