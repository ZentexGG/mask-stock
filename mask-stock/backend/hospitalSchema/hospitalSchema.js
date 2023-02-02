const mongoose=require("mongoose")

const hospitalSchema=new mongoose.Schema({
    name: String,
})

module.exports=mongoose.model("Hospitals", hospitalSchema)