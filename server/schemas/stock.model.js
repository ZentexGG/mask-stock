const { Schema, model } = require("mongoose");

module.exports = model(
    "Stock",
    new Schema({
        price: Number,
        stock: Number,
    })
);
