const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Stock = require("./schemas/stock.model");
const apiRouter = require("./routes/api");

const PORT = 8008;

const connectToDB = (dbName) => {
    mongoose.set("strictQuery", false);
    mongoose
        .connect(`mongodb://127.0.0.1:27017/${dbName}`)
        .catch((error) => console.log(error))
        .then((r) => console.log(`Connected to DB: ${r.connection.name}`));
};

const restockMasks = async () => {
    const dateObj = new Date();
    const today = dateObj.getDate();

    if (today === 1) {
        console.log("Restocking masks...");
        let currentStock = await Stock.findOne({}).lean();
        currentStock = currentStock["stock"];
        await Stock.findOneAndUpdate(
            { price: 300 },
            { stock: currentStock + 10000 },
            { new: true }
        );
    }
};

express()
    .use(express.json())
    .use(
        cors({
            origin: "http://localhost:3000",
            credentials: true,
        })
    )
    .use("/api", apiRouter)
    .get("/", (req, res) => {
        res.send("All good chief.");
    })
    .post("/", (req, res) => {
        res.send(req.body);
    })
    .listen(PORT, async () => {
        console.log(`Server on http://127.0.0.1:${PORT}`);
        connectToDB("mask-stock");
        restockMasks();
    });
