const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
const PORT = 8008;

const connectToDB = (dbName) => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(`mongodb://127.0.0.1:27017/${dbName}`)
    .catch((error) => console.log(error))
    .then((r) => console.log(`Connected to DB: ${r.connection.name}`));
};

app.get("/", (req, res) => {
  res.send("All good chief.");
});

const apiRouter = require("./routes/api");
app.use('/api', apiRouter);

app.listen(PORT, async () => {
    console.log(`Server on http://127.0.0.1:${PORT}`);
    connectToDB('mask-stock-remake');
})
