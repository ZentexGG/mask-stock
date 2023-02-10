const { Schema, model } = require("mongoose");

module.exports = model(
    "Hospital",
    new Schema({
        name: { type: String, unique: true },
        country: String,
        vat: Number,
        users: Array,
    })
);
