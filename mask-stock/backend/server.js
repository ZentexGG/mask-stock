const express = require('express')
const app = express()
const port = 5000;
const connect = require('./connectToDb')

app.listen(port, () => {
    connect()
   console.log(`Connected to ${port}`);
})