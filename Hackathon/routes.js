const express=require("express");
const postController=require("./post");
const router=express.Router();


//get the loading page
router.get("/",postController.getPosts);
//Example url to get data from db
router.get("/battery",postController.getbattery);


router.get("/getrecipe", postController.getrecipe); 

  
//export
module.exports=router;