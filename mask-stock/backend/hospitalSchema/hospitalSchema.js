const mongoose=require("mongoose")

const hospitalSchema=new mongoose.Schema({
    name:{type:String,unique:true,required:"Username is required"},
    accounts:{type:Array},
    orders:{type:Array},
})

module.exports=mongoose.model("Accounts",accountSchema)