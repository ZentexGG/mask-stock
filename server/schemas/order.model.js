const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  price: Number, // DIN FRONTEND (PRET PE BUCATA)
  date: String, // DIN BACKEND
  quantity: Number, // DIN FRONTEND
  hospital: String, // DIN FRONTEND
  orderNumber: String, // DIN BACKEND
  vat: Number // DIN BACKEND
});

module.exports = mongoose.model("Order", orderSchema);
