const router=require("express").Router();
const Taskmodel=require("../models/task_model");
router.get("/welcome",function(req,res){
    res.json("welcome")
});


router.post("/createtask",async function(req,res){
    const data=req.body;
    const newdata=Taskmodel(data);
   
        savedata=await newdata.save();
        if(savedata){
            res.json({success:true,data:savedata});
            return;
        }
        res.json({success:false,data:"something is wrong"});
        return;
    
});








router.get("/alltasks",async function(req,res){
    await Taskmodel.find().exec(function(err,tasks){
        if(err){
            res.json({success:false,error:err});
            return;
        }
        res.json({success:true,data:tasks});
        return;
    });

});


router.get("/task/:id",async function(req,res){
    const id=req.params.id;
    try{
    const task=await Taskmodel.findOne({_id:id});
        if(!task){
            
            res.json({success:true,data:task});
        return;
        }
    }
    catch(err){ 
        res.json({success:false,error:err})
            return;
        }
    });




    router.delete("/delete",async function(req,res){
        const id=req.body.id;
        try{
        const deletetask=await Taskmodel.findOneAndRemove({_id:id});
            if(deletetask){
                
                res.json({success:true,data:deletetask});
            return;
            }
        }
        catch(err){ 
            res.json({success:false,error:err})
                return;
            }
        });




        router.post("/update",async function(req,res){
            const id=req.body.id;
            const data=req.body;
            try{
            const update=await Taskmodel.findOneAndUpdate({_id:id},data);
                if(update){
            
                    res.json({success:true,data:update});
                return;
                }
            }
            catch(err){ 
                res.json({success:false,error:err})
                    return;
                }
            });
        
    



module.exports=router;