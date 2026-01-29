const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const dbUri = process.env.MONGODB_URI;

    if (!dbUri) {
      console.error('Error: MONGODB_URI is not defined in environment variables');
      process.exit(1);
    }

    const conn = await mongoose.connect(dbUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
