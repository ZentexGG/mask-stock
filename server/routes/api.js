require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { cookieJwtAuth } = require("../middleware/cookieJwtAuth")

const User = require("../schemas/account.model");
const Order = require("../schemas/order.model");
const Hospital = require("../schemas/hospital.model");
const Stock = require("../schemas/stock.model");

const router = express.Router();

router.use(cookieParser());

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

router.post("/login", async (req, res) => {
  let { username, password } = req.body;
  let query = await User.find({ username: username }).lean();
  if (query.length > 0) {
    bcrypt.compare(password, query[0]["password"], (err, result) => {
      // AICI AI REUSIT SA TE LOGEZI
      if (result) {
        const token = jwt.sign(req.body, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "20s",
        });
        res.cookie("token", token, { 
          httpOnly: true,
          
        });
        // res.redirect("http://localhost:3000");
        res.send(token);
      }
    });
  } else {
    // AICI E LOGIN FAILED
    // res.redirect("http://localhost:3000/register");
    res.send(false);
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token").json({ success: true });
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

router.put("/register", (req, res) => {
  let username = req.body["username"];
  let hospital = req.body["hospital"];
  hospital.map((e) => {
    Hospital.updateOne(
      { name: e },
      { $addToSet: { users: username } },
      (err, docs) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Updated Docs : ", docs);
        }
      }
    );
  });
});

module.exports = router;
