const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  price: Number,
  stock: Number
});

module.exports = mongoose.model("Stock", stockSchema);
