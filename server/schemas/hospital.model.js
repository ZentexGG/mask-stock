const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  country: String,
  vat: Number,
  users: Array
});

module.exports = mongoose.model("Hospital", hospitalSchema);
