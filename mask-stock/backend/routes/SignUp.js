const express=require("express")
const signUp=express.Router()
const account = require("../accountSchema/accountSchema")
const Hospitals = require('../hospitalSchema/hospitalSchema');
signUp.get('/signup', async (req, res) => {
        let query = await Hospitals.find().select('name -_id')
        res.send(query)
})
signUp.post('/signup',(req,res)=>{
        const newUser=new account(req.body)
        newUser.save().catch((e)=>{res.send(e)})    
})


module.exports=signUp
