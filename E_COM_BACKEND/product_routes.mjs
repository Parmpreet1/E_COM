import Express from "express";
const route = Express.Router();
import { objOfProduct } from "./controler/products_controler.mjs";
import multer from "multer";
import path from "path";

const dest_filename = multer.diskStorage({
  destination: "./E_COM_BACKEND/public",
  filename: (req,file,cb)=>{
    console.log("body in multer",req.body)
    cb(null,`${file.fieldname}${path.extname(file.originalname)}`)
  },
});
// const upload = multer({ dest: "./E_COM_BACKEND/public" });
const upload = multer({ storage:dest_filename });


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
