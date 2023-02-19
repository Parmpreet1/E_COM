import React, { useContext, useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";

import { adminContext } from "../../Modal/contextApi/adminContext";
import "./Style/addUpdateProduct.css";
export const AddUpdateProduct = ({ taskName }) => {
  const admin = useContext(adminContext);
  const [FormData, setFormData] = admin.formDataState;
  const [isFileChange, setisFileChange] = admin.FileChangeState
  const required=taskName=="Add Product"?true:false
 
  useEffect(() => {
    console.log("req : ",required)
    setFormData(() => {
      return {
        image: null,
        title: "",
        description: "",
        stock: "",
        price: "",
        category: "",
      };
    }, [taskName]);
    return()=>{
      setisFileChange(false)
    }
  }, [taskName]);

  const onChangeHandler = (e) => {
    e.preventDefault()
    let { name, value } = e.target;
    if (name == "image") {
      value = e.target.files[0];
      setisFileChange(true);
      console.log("image input");
    }
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (confirm("Are you want to add this data?")) {
      if (!isFileChange) {
        setFormData((pre) => {
          delete pre.image;
          return pre;
        });
      }
      try {
        let response;
        if (taskName == "Update Product") {
          console.log("client side form data: ", FormData);
          response = await admin.updateproduct(FormData);
          if (response.data.message){
            alert(`"server error " ${response.data.message}`)
          }
          else{
            console.log("Product updated ", response);
            alert(`Product updated `);
          }
        } else if (taskName == "Add Product") {
          response = await admin.add_product(FormData);
          if (response.data.message){
            alert(`"server error " ${response.data.message}`)
          }
          else{
            console.log("Product added", response);
            alert(`Product Added `);
          }
        }
      } catch (err) {
        alert(`Some things went worng in modification: ${err.message}`);
      }
    }
  };

  return (
    <div className="container">
      <form className="add_pro_form" onSubmit={onSubmit}>
        <h1>{taskName}</h1>
        <span style={{ float: "left", marginBottom: "0.5em" }}>
          Add product image
        </span>
        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Add product image"
            name="image"
            onChange={onChangeHandler}
            required={required}
          />
        </div>
        <div className="mb-3">
          Title
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter product title"
            name="title"
            value={FormData.title}
            onChange={onChangeHandler}
            required={required}
          />
        </div>
        <div className="mb-3">
          Description
          <textarea
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter product description"
            name="description"
            value={FormData.description}
            onChange={onChangeHandler}
            required={required}
          />
        </div>
        <div className="mb-3">
          Stock
          <input
            type="number"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter product stock"
            name="stock"
            value={FormData.stock}
            onChange={onChangeHandler}
            required={required}
          />
        </div>
        <div className="mb-3">
          Price
          <input
            type="number"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter product price"
            name="price"
            value={FormData.price}
            onChange={onChangeHandler}
            required={required}
          />
        </div>
        <div>
          Category
          <select
            className="form-select"
            aria-label="Default select example"
            name="category"
            value={FormData.category}
            onChange={onChangeHandler}
            required={required}
          >
            <option defaultValue={"none"} disabled>
              Select product category
            </option>
            <option value={"none"}>none</option>
            <option value={"electronics"}>Electronics</option>
            <option value={"jewelery"}>Jewelery</option>
            <option value={"men_clothes"}>Man clothes</option>
            <option value={"women_clothes"}>Women clothes</option>
          </select>
        </div>
        <br />
        <button type="submit" className="btn btn-primary">
          {taskName}
        </button>
      </form>
    </div>
  );
};
