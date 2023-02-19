import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
import { userProfilePic_col, user_col } from "../modal/database_mongo.mjs";
class user{
    async registerUser(req,res){
        const profile=req.body
        let img_base64 = fs.readFileSync(req.file.path).toString("base64");
        const img_type=req.file.mimetype
        const image={
            userEmail:profile.email,
            data:img_base64,
            type:img_type
        }
        
        profile.profilePic=`http://${process.env.host}:${process.env.port}/profilePic/${profile.email}`
        const userData={
            profile,
            cart:{},
            wishlist:{}
        }
        // console.log(userData)
        
        try{
            //add profilepic  in database 
            const imgdata=new userProfilePic_col(image)
            await imgdata.save()
            //add user detaills in database
            const userdata=new user_col(userData)
            const response=await userdata.save()
            res.send(response)
        }
        catch(err){
            console.log("Error in user registration",err)
            res.send(err)
        }

    }
    async getUserProfilePic(req,res){
        const email=req.params.email
        const data=await userProfilePic_col.find({userEmail:email})
        const imgbuffer=Buffer.from(data[0].data,'base64')
        res.send(imgbuffer)
    }
    async loginUser(req,res){
        const {email,password}=req.body
        console.log(req.body)
        try{
            const response=await user_col.find({"profile.email":email,"profile.password":password})
            console.log("login ",email,password)
            console.log("login ",response)
            res.send(response)
        }
        catch(err){
            console.log("error in user login",err)
            res.send(err)
        }
    }
    async updateUserData(req,res){
        try{
            const response=await user_col.updateOne({"profile.email":req.params.email},{$set:req.body})
            console.log(response)
            res.send(response)
        }
        catch(err){
            console.log("error in update user",err)
            res.send(err)
        }
    }
}

export const userObj=new user()