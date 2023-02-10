const { Schema, model } = require("mongoose");

module.exports = model(
    "Order",
    new Schema({
        price: Number,
        date: String,
        quantity: Number,
        hospital: String,
        orderNumber: String,
        vat: Number,
    })
);
