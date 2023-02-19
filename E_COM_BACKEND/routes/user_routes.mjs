import express  from "express";
import multer from "multer";
import path from "path";
import { userObj } from "../controler/user_controler.mjs";
export const userRoute=express.Router()

multer({
    limits: { fieldSize: 25 * 1024 * 1024 }
  })
  const dest_filename = multer.diskStorage({
    destination: "./E_COM_BACKEND/public",
    filename: (req,file,cb)=>{
      console.log("body in multer",req.body)
      cb(null,`${file.fieldname}${path.extname(file.originalname)}`)
    },
  });
  const upload = multer({ storage:dest_filename });

userRoute.put('/user/:email',(req,res)=>{
  userObj.updateUserData(req,res)
})
userRoute.use('/user',upload.single('profilePic'),(req,res)=>{
    if(req.method=="POST"){
        userObj.registerUser(req,res)
    }

})
userRoute.use('/profilePic/:email',(req,res)=>{
    userObj.getUserProfilePic(req,res)
})

userRoute.post('/userlogin',(req,res)=>{
    userObj.loginUser(req,res)
})