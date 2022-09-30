const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Notfound=require("./middleware/page_note_found");
const User_routes=require("./routes/user_routes");
const task_management=require("./routes/task_route");
app.use(express.json());



mongoose.connect("mongodb+srv://Aqib:aqib1234@cluster0.vtsjkjx.mongodb.net/scratchecomerceapp").then(
    function(){
        console.log("connected");
        app.use("/api/user",User_routes);
        // app.use(Notfound);
        app.use("/api/task",task_management);
}
);

app.listen(3000,function(){
    console.log("server started at ${3000}")
});

