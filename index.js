const express=require("express");
const app=express();
const mongoose=require("mongoose");
const User_routes=require("./routes/user_routes");
const Product_routes=require("./routes/product_routes");
const Category_routes=require("./routes/category_route");
const File_routes=require("./routes/file_route");
const Cartitem_Route=require("./routes/cart_item_route");
app.use(express.json());
app.use(express.static("uploads"));


mongoose.connect("mongodb+srv://Aqib:aqib1234@cluster0.vtsjkjx.mongodb.net/scratchecomerceapp").then(
    function(){
        console.log("connected");
        app.use("/api/user",User_routes);
        app.use("/api/product",Product_routes);
        app.use("/api/category",Category_routes);
        app.use("/api/",File_routes);
        app.use("/api/",Cartitem_Route);

    }
);

app.listen(3000,function(){
    console.log("server started at ${3000}")
});

