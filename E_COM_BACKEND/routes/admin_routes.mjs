import express  from "express";
const route=express.Router()
import { adminObj } from "../controler/admin_controler.mjs";
route.post('/adminLogin',(req,res)=>{
    adminObj.adminLogin(req,res)
})
route.get('/adminLogout',(req,res)=>{
    adminObj.adminLogout(req,res)
})

export default route