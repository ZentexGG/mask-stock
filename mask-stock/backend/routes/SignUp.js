const express=require("express")
const signUp=express.Router()
const account=require("../accountSchema/accountSchema")

signUp.post('/signUp',(req,res)=>{
        const newUser=new account(req.body)
        newUser.save().catch((e)=>{res.send(e)})    
})

module.exports=signUp
