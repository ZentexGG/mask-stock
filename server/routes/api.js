const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const User = require("../schemas/account.model");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        return res.status(200).json({ message: "User created successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post("/login", (req, res, next) => {
    passport.authenticate("local", { session: false }, (error, user, info) => {
        if (error || !user) {
            return res.status(400).json({
                message: "Incorrect username or password",
                user: user,
            });
        }

        req.login(user, { session: false }, (error) => {
            if (error) {
                return res.send(error);
            }

            const token = jwt.sign(
                user.toJSON(),
                process.env.ACCESS_TOKEN_SECRET
            );

            return res.json({ user, token });
        });
    })(req, res, next);
});

module.exports = router;
