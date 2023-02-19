
import {admin_col} from "../modal/database_mongo.mjs";
class admin {
  async adminLogin(req, res) {
    const data=await admin_col.find({email:req.body.email,password:req.body.password})
    
            if(data.length>0){
              req.session.adminEmail=data[0].email
              req.session.adminPassword=data[0].password
            }
          res.send(data);
  }
  adminLogout(req,res){
    req.session.destroy()
    console.log("admin session destroyed")
    res.send("session destroyed")
  }
}

export const adminObj = new admin();
