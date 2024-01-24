const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const res = await mongoose.connect("mongodb://127.0.0.1:27017/sampleAuth");
    if (res) console.log("connection successful");
    else console.log("No connection");
  } catch (err) {
    console.log(err);
  }
};
module.exports = connectDB;
