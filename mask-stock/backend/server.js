const express=require("express")
const app=express()
const port=2002
const bp=require("body-parser")
const connectToDb=require("./connectToDb")

const signUp=require("./routes/SignUp")

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use('/api',signUp)
app.get('/',(req,res)=>{
    res.send("API is up and running")
    
})
app.listen(port,()=>{
    connectToDb()
    console.log(`Connected to port:${port}`)
})
