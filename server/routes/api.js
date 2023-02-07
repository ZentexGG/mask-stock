const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const User = require("../schemas/account.model");
const Order = require("../schemas/order.model");
const Hospital = require("../schemas/hospital.model");
const Stock = require("../schemas/stock.model");

const router = express.Router();

router.get("/hospitals", async (req, res) => {
  const hospitals = await Hospital.find({}).lean();
  res.send(hospitals);
});

router.get("/stock", async (req, res) => {
  const maskStock = await Stock.find({}).lean();
  res.send(maskStock);
});

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

      const token = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET);

      return res.json({ user, token });
    });
  })(req, res, next);
});

router.post("/order", async (req, res) => {
  const dateObj = new Date();
  const today = `${dateObj.getDate()}-${
    dateObj.getMonth() + 1
  }-${dateObj.getFullYear()}`;
  let userOrder = req.body;
  userOrder["date"] = today;
  const finalOrder = new Order(userOrder);
  finalOrder.save().then((value) =>
    res.send({
      message: "Order registered succesfully!",
      registeredOrder: value,
    })
  );
});

module.exports = router;
