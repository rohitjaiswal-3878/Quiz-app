const mongoose = require("mongoose");
require("dotenv").config();

// Used for connecting to mongoDB.
const connectToDatabase = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(process.env.MONGO_DB).catch((err) => reject(err));
    mongoose.connection.on("connected", () => {
      resolve("Connected to mongoDB.");
    });
  });
};

module.exports = { connectToDatabase };
