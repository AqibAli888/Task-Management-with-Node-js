const mongoose=require("mongoose");
const User_Schema=mongoose.Schema({
    id:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    token:{
        type:String,
    },


    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },


    date:{
        type:Date,
        default:Date.now
    },


});



const model=mongoose.model("User_model",User_Schema);
module.exports=model;