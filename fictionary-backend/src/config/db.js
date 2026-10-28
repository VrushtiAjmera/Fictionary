const mongoose = require("mongoose");
const logger = require("pino")();

async function connectDB() {
    
  if (!process.env.MONGODB_URI) {
    throw new Error("Db not found");
  }

  await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMs: 10000,
  });

  logger.info("MongoDB Atlas connected successfully");
}

module.exports = connectDB;