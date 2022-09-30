const router=require("express").Router();
const bcryptjs=require("bcryptjs");
const Usermodel=require("../models/user_model");
const jwt=require("jsonwebtoken");
const newjwt=require("../middleware/jwt");
router.get("/welcome",async function(req,res){
    res.json({success:true,data:"welcomme"})

});



router.post("/register",async function(req,res){
    const userenterdata=req.body;
    email=userenterdata.email;
    console.log(userenterdata +  email);
    const password=userenterdata.password;
    console.log(password);
    const hashed_password=await bcryptjs.hash(password,8);
    userenterdata.password=hashed_password;
    const newuser=new Usermodel(userenterdata);
    const token=await jwt.sign({id:req.body.id},"secretkey"
    );
    newuser.token=token;
    console.log(userenterdata);
        const finduser=await Usermodel.findOne({email});
        console.log(finduser);
        if(finduser){
            res.json({success:false,data:"This email is in used"});
            return;
        }
    try{
        
        saved_user=newuser.save();
        res.json({success:true,data:newuser})


    }catch(err){
        res.json({success:false,data:err})

    }


});






router.post("/login",async function(req,res){
    const userdata=req.body;
    email=userdata.email;
    password=userdata.password;
    const founduser=await Usermodel.findOne({email});
    if(!founduser){
        res.json({success:false,data:"Incorrect email"});
            return;
    }
    const correctpassword=await bcryptjs.compare(password,founduser.password);
    if(!correctpassword){
        res.json({success:false,data:"Incorrect password"});
            return;
        
    }
   
    res.json({success:true,data:founduser});
});




router.delete("/delete",async function(req,res){
    const id=req.body.id;
    const deleteuser=await Usermodel.findOneAndRemove({id:id});
    if(!deleteuser){
        res.json({success:false,error:"not deleted"});
        return;
    }
    res.json({success:true,data:deleteuser});
    return
});



router.get("/users/:emailid",newjwt,async function(req,res){
    userdata=req.params.emailid;
    const founduser=await Usermodel.findOne({email:userdata});
    if(!founduser){
        res.json({success:false,data:"Not found"});
            return;
    }
    res.json({success:true,data:founduser});
});



router.put("/update",async function(req,res){
    userdata=req.body;
    userid=userdata.id;

    const founduser=await Usermodel.findOneAndUpdate({id:userid},userdata);
    if(!founduser){
        res.json({success:false,data:"Not found"});
            return;
    }
    res.json({success:true,data:founduser});
});



module.exports=router;