const { Schema, model } = require("mongoose");

module.exports = model(
    "Account",
    new Schema({
        username: {
            type: String,
            unique: true,
            required: true,
        },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
    })
);
