require("dotenv").config();

const { Router } = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const uuid = require("uuid").v4;
const easyinvoice = require("easyinvoice");
const fs = require("fs");
const path = require("path");

const User = require("../schemas/account.model");

const Order = require("../schemas/order.model");
const Hospital = require("../schemas/hospital.model");
const Stock = require("../schemas/stock.model");

module.exports = Router()
    .use(
        session({
            resave: false,
            saveUninitialized: false,
            secret: process.env.ACCESS_TOKEN_SECRET,
            cookie: {
                maxAge: 1000 * 60 * 60 * 60,
                sameSite: "lax",
                secure: false,
            },
        })
    )
    .get("/hospitals", async (req, res) => {
        const hospitals = await Hospital.find({}).lean();
        res.json(hospitals);
    })
    .post("/hospitals", async (req, res) => {
        const hospitals = await Hospital.find({ users: req.body.user }).lean();
        res.json(hospitals);
    })
    .get("/stock", async (req, res) => {
        const maskStock = await Stock.findOne({}).lean();
        res.json(maskStock);
    })
    .post("/register", async (req, res) => {
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
            return res
                .status(200)
                .json({ message: "User created successfully" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    })
    .post("/login", async (req, res) => {
        let { username, password } = req.body;
        let query = await User.find({ username: username }).lean();

        if (query.length > 0) {
            bcrypt.compare(password, query[0]["password"], (err, result) => {
                if (result) {
                    try {
                        const name = req.body.username;
                        req.session.name = name;
                        res.status(201).json({
                            message: "Saved cookie successfully",
                        });
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
    })
    .get("/login", async (req, res) => {
        try {
            res.status(201).json({ message: req.session.name });
        } catch (error) {
            console.log(error);
        }
    })
    .get("/logout", async (req, res) => {
        req.session.destroy();
        res.status(201).json({ message: "Cookie cleared successfully" });
    })
    .get("/success", async (req, res) => {
        res.status(201).json({ message: "Order submited succesfully" });
    })
    .post("/order", async (req, res) => {
        const d = new Date();
        const today = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;

        let userOrder = req.body;
        userOrder["date"] = today;
        userOrder["price"] = 300;
        userOrder["orderNumber"] = uuid();
        userOrder["orderNumber"] = userOrder["orderNumber"].split("-")[0];

        let hospitalCountry = await Hospital.find({
            name: req.body.hospital,
        }).lean();

        let hospitalVAT = hospitalCountry[0]["vat"];
        hospitalCountry = hospitalCountry[0]["country"];
        userOrder["vat"] = hospitalVAT;

        new Order(userOrder).save().then((value) =>
            res.send({
                message: "Order registered succesfully!",
                registeredOrder: value,
            })
        );

        let dd = new Date();
        dd.setDate(d.getDate() + 15);

        let invoiceData = {
            images: {
                logo: "https://infofer.ro/images/sigle_clienti/cfrcalatori.png",
            },
            client: {
                company: userOrder["hospital"],
                country: hospitalCountry,
            },
            sender: {
                company: "CFR Calatori",
                address: "Gara Ploiesti Sud",
                zip: "69420",
                city: "Fierbinti",
                country: "Romania",
            },
            information: {
                number: userOrder["orderNumber"],
                date: today,
                "due-date": `${dd.getDate()}-${
                    dd.getMonth() + 1
                }-${dd.getFullYear()}`,
            },
            products: [
                {
                    quantity: userOrder["quantity"],
                    "tax-rate": parseInt(hospitalVAT),
                    price: userOrder["price"],
                    description: "Box of Masks (100 pcs)",
                },
            ],
            bottomNotice: "Kindly pay your invoice within 15 days.",
            settings: {
                currency: "EUR",
            },
        };

        easyinvoice.createInvoice(invoiceData, function (result) {
            fs.writeFileSync("invoice.pdf", result.pdf, "base64");
        });
        let currentStock = await Stock.find({}).lean();
        currentStock = currentStock[0]["stock"];

        await Stock.findOneAndUpdate(
            { price: 300 },
            { stock: currentStock - userOrder["quantity"] },
            { new: true }
        );
    })
    .get("/invoice", (req, res) => {
        res.download(path.join(__dirname, "..", "invoice.pdf"));
    })
    .put("/register", (req, res) => {
        const { username, hospital } = req.body;

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
