const express = require("express");
const mongoose = require("mongoose");

const app = express();

const Stock = require("./schemas/stock.model");

app.use(express.json());
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
    await Stock.findOneAndUpdate(
      {
        _id: "63e203ea099b00a399695ca9",
      },
      {
        stock: 10000
      },
      {
        new: true,
      }
    );
  } else {
    console.log("Restocking masks not necessary");
  }
};

app.get("/", (req, res) => {
  res.send("All good chief.");
});

const apiRouter = require("./routes/api");
app.use("/api", apiRouter);

app.listen(PORT, async () => {
  console.log(`Server on http://127.0.0.1:${PORT}`);
  connectToDB("mask-stock");
  restockMasks();
});
