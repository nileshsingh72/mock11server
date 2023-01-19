require("dotenv").config();
const mongoose = require("mongoose");
const connectDb = () => {
  return mongoose.connect(process.env.URL);
};
module.exports = { connectDb };
