import Express from "express";
const route = Express.Router();
import { objOfProduct } from "./controler/products_controler.mjs";
import multer from "multer";
import path from "path";
const checkAdmin=(req,res,next)=>{
  if(req.method=="GET"){
    next()
  }
  else if(req.session?.adminEmail&&req.session?.adminPassword){
    next()
  }
  else{
    res.send({message:"Admin Session Expire: plesase login first as a admin"})
  }
}
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
// const upload = multer({ dest: "./E_COM_BACKEND/public" });
const upload = multer({ storage:dest_filename });
// route.use(checkAdmin)

route.use("/products/:_id",upload.single("image"), (req, res) => {
  if(req.method=="DELETE"){
    objOfProduct.delete_product(req,res)
  }
  else if(req.method=="PUT"){
    objOfProduct.update_product(req,res)
  } 
  else if(req.method=="GET"){
    objOfProduct.display_products(req,res)
  }
});

route.use("/products", upload.single("image"), (req, res) => {
  if (req.method == "POST") {
    objOfProduct.add_products(req, res);
  }
  else if(req.method=="GET") {
    objOfProduct.display_products(req, res);
  }
});

export default route;
