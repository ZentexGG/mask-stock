require('dotenv').config()
const express = require("express");
const session = require('express-session');
const cors = require('cors');
const bcrypt = require("bcrypt");
const uuid = require('uuid').v4;
const easyinvoice = require('easyinvoice');
const fs = require('fs');
const path = require('path');

const User = require("../schemas/account.model");

const Order = require("../schemas/order.model");
const Hospital = require("../schemas/hospital.model");
const Stock = require("../schemas/stock.model");

const router = express.Router();

router.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.ACCESS_TOKEN_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 60,
      sameSite: "lax",
      secure: false,
    }
  })
);


router.get("/hospitals", async (req, res) => {
  const hospitals = await Hospital.find({}).lean();
  res.send(hospitals);
});
router.post("/hospitals", async (req, res) => {
  const hospitals = await Hospital.find({users:req.body.user}).lean();
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
      if (result) {
        try {
          const name = req.body.username;
          console.log(name)
          console.log(req.body.username)
          req.session.name = name;
          res.send({ message: "Saved cookie successfully" }).status(201);
        } catch (error) {
          console.log(error);
        }
      } else {
        res.send(false);
      }
    });
  } else {
    res.send(false);
  }
});

router.get("/login", async (req, res) => {
   try {

     res.send({ message: req.session.name }).status(201);
   } catch (error) {
     console.log(error);
   }
})

router.get("/logout", async (req, res) => {
  req.session.destroy()
  res.send({ message: "Cookie cleared successfully" }).status(201);
});

router.get("/success", async (req, res) => {
  res.send({message: "Order submited succesfully"}).status(201)
})

router.post("/order", async (req, res) => {
  const dateObj = new Date();
  const today = `${dateObj.getDate()}-${dateObj.getMonth() + 1
    }-${dateObj.getFullYear()}`;
  let userOrder = req.body;
  userOrder["date"] = today;
  userOrder['price'] = 300;
  userOrder['orderNumber'] = uuid();
  userOrder['orderNumber'] = userOrder['orderNumber'].split("-")[0];
  let hospitalCountry = await Hospital.find({ name: req.body.hospital }).lean();
  let hospitalVAT = hospitalCountry[0]['vat'];
  hospitalCountry = hospitalCountry[0]['country'];
  userOrder['vat'] = hospitalVAT;
  const finalOrder = new Order(userOrder);
  finalOrder.save().then((value) =>
    res.send({
      message: "Order registered succesfully!",
      registeredOrder: value,
    })
  );
  let invoiceData = {
    "client": {
      "company": userOrder['hospital'],
      "country": hospitalCountry
    },
    "sender": {
      "company": "CFR Calatori",
      "address": "Gara Ploiesti Sud",
      "zip": "69420",
      "city": "Fierbinti",
      "country": "Romania"
    },
    "information": {
      "number": userOrder['orderNumber'],
      "date": today
    },
    "products": [
      {
        "quantity": userOrder['quantity'],
        "tax-rate": parseInt(hospitalVAT),
        "price": userOrder['price'],
        "description": "Box of Masks (100 pcs)"
      }
    ],
    "bottomNotice": "Kindly pay your invoice within 15 days.",
    "settings": {
      "currency": "EUR",
      "margin-top": 25, 
         "margin-right": 25, 
         "margin-left": 25, 
      "margin-bottom": 25,
         "format": "A4",
         "height": "1000px",
         "width": "500px", 
         "orientation": "landscape",
    }
  }

  easyinvoice.createInvoice(invoiceData, function (result) {
    fs.writeFileSync("invoice.pdf", result.pdf, "base64");
  });
  let currentStock = await Stock.find({}).lean();
  currentStock = currentStock[0]["stock"];
  await Stock.findOneAndUpdate(
    {
      price: 300,
    },
    {
      stock: currentStock - userOrder['quantity']
    },
    {
      new: true,
    }
  );
  
});

router.get("/invoice", (req, res) => {
  res.download(path.join(__dirname, '..', 'invoice.pdf'))
})

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
