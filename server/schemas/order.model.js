const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  price: Number,
  date: String,
  quantity: Number,
  hospital: String
});

module.exports = mongoose.model("Order", orderSchema);
