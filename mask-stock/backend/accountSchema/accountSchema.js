const mongoose=require("mongoose")

const accountSchema=new mongoose.Schema({
    username:{type:String,unique:true,required:"Username is required"},
    email:{type:String,unique:true,required:'Email is required'},
    password:{type:String,required:'Password is required'},
    hospital:{type:String,required:'Hospital is required'}
})

module.exports=mongoose.model("Accounts",accountSchema)