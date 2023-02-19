import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
let mongo_url = process.env.mongo_url;
mongoose.connect("mongodb+srv://parmsohi:Sohi%409999@clusterparmsohi.jsnzlkh.mongodb.net/e-commerce?retryWrites=true&w=majority");
const products_schema = new mongoose.Schema({
  image: {type:Object,required:true},
  title: {type:String,required:true},
  description: {type:String,required:true},
  category: {type:String,required:true},
  price: { type: Number,required:true},
  stock: { type: Number,required:true},
});

const userSchema =new mongoose.Schema({
  profile:{
    email: { type: String, unique: true, required: true },
    password: {type:String,required:true},
    profilePic:String,
    name: String,
    address: String,
    city: String,
    state: String,
    pin:Number
  },
  cart:Array,
  orders:Array,
  wishlist:Array
});

const userProfilePicSchema=new mongoose.Schema({
  userEmail:{type:String,unique:true},
  data:String,
  type:String
})
const products_col = mongoose.model("product", products_schema);
// const products_col = mongoose.connection("manage_product");
export const admin_col=mongoose.model("admin",new mongoose.Schema)
export const user_col=mongoose.model('user',userSchema)
export const userProfilePic_col=mongoose.model('userProfilePic',userProfilePicSchema)
export default products_col;

