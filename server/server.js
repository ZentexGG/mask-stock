const express = require("express");
const mongoose = require("mongoose");
const cors=require('cors')
const app = express();


const Stock = require("./schemas/stock.model");

app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true}));
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
    let currentStock = await Stock.find({
      _id: "63e203ea099b00a399695ca9",
    }).lean();
    currentStock = currentStock[0]["stock"];
    await Stock.findOneAndUpdate(
      {
        _id: "63e203ea099b00a399695ca9",
      },
      {
        stock: currentStock + 10000,
      },
      {
        new: true,
      }
    );
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
app.post("/",(req,res)=>{
  console.log(req.body)
  res.send(req.body)
})
