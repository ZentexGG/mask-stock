require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const Hospital = require("../schemas/hospital.model");
const Stock = require("../schemas/stock.model");

const connectToDB = (dbName) => {
    mongoose.set("strictQuery", false);
    mongoose
        .connect(`mongodb://127.0.0.1:27017/${dbName}`)
        .catch((error) => console.log(error))
        .then((r) => console.log(`Connected to DB: ${r.connection.name}`));
};

const populate = async () => {
    connectToDB("mask-stock");
    
    let hospitalData = fs.readFileSync(
        path.join(__dirname, "hospitals.json"),
        "utf-8"
    );
    hospitalData = JSON.parse(hospitalData);
    await Hospital.insertMany(hospitalData);

    let stockData = fs.readFileSync(
        path.join(__dirname, "stock.json"),
        "utf-8"
    );
    stockData = JSON.parse(stockData);
    
    await Stock.insertMany(stockData);
    console.log("Database is now populated!");
    process.exit(0);
};

populate();
