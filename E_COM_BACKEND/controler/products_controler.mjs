import fs from "fs";
import products_col from "../modal/database_mongo.mjs";
import mongoose from "mongoose";
// import Regex from "regex";
class product_manage {
  //display products
  async display_products(req, res) {
    let data;
    if (req.params._id) {
      data = await products_col.find({
        _id: mongoose.Types.ObjectId(req.params._id),
      });
    } else if (req.query.search) {
      const search = req.query.search;
      console.log("search ", search);
      data = await products_col.find({
        $or: [{ title: { $regex: search,$options:"i"}}],
      });
    } else {
      data = await products_col.find({});
    }
    // let file = Buffer.from(data[4].image.data,'base64')
    data = JSON.stringify(data);
    res.contentType("application/json");
    res.send(data);
  }
  //Add New Products
  async add_products(req, res) {
    let b_data = req.body;
    // console.log("body data in add :",b_data)
    try {
      let img_base64 = fs.readFileSync(req.file.path).toString("base64");
      b_data = {
        ...b_data,
        image: {
          data: img_base64,
          content_type: req.file.mimetype,
        },
      };

      const result = new products_col(b_data);
      // const data = {
      //   image: {
      //     data: img_base64,
      //     content_type: req.file.mimetype,
      //   },
      //   title: b_data.title,
      //   description: b_data.description,
      //   category: b_data.category,
      //   price: parseInt(b_data.price),
      //   stock: parseInt(b_data.stock),
      // };
      await result.save();
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  }
  //update product
  async update_product(req, res) {
    try {
      const b_data = req.body;
      console.log("body in update:", b_data);
      const data = {
        title: b_data.title,
        description: b_data.description,
        category: b_data.category,
        price: parseInt(b_data.price),
        stock: parseInt(b_data.stock),
      };
      const response = await products_col.updateOne(
        { _id: mongoose.Types.ObjectId(req.params._id) },
        { $set: data }
      );
      console.log("put response ", response);
      res.send(response);
    } catch (err) {
      res.send(`error in put ${err}`);
    }
  }
  //delete product
  async delete_product(req, res) {
    try {
      const id = req.params._id;
      const response = await products_col.deleteOne({
        _id: mongoose.Types.ObjectId(id),
      });
      res.send(response);
    } catch (err) {
      console.log("error in delete :", err);
      res.send(err);
    }
  }
}
export const objOfProduct = new product_manage();
