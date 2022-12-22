import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
let mongo_url = process.env.mongo_url;
mongoose.connect(mongo_url);
const products_schema = new mongoose.Schema({
  id: { type: Number, unique: true ,required:true},
  image: Object,
  title: String,
  description: String,
  category: String,
  price: Number,
  stock: Number,
});

const products_col = mongoose.model("manage_product", products_schema);
// const products_col = mongoose.connection("manage_product");

export default products_col;

