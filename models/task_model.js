const mongoose=require("mongoose");
const Task_Schema=mongoose.Schema({
    id:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
    },
    completed:{
        type:Boolean,
        default:false
    },

});



const model=mongoose.model("Task_model",Task_Schema);
module.exports=model;