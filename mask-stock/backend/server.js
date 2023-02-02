const express=require("express")
const app=express()
const port=2002
const bp = require("body-parser")
const Hospitals = require('./hospitalSchema/hospitalSchema');
const connectToDb = require("./connectToDb")
const path = require('path');

const signUp=require("./routes/SignUp");
const fs = require('fs')

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use('/api',signUp)

const readJson = (filePath) => {
    let data = fs.readFileSync(filePath)
    data = JSON.parse(data);
    return data;
}

app.get('/',(req,res)=>{
    
    res.send()
})


app.listen(port,()=>{
    connectToDb()
    console.log(`Connected to port:${port}`)
})
