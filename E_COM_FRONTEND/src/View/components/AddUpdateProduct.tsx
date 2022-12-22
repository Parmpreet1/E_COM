import React, { useContext, useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";

import { adminContext } from "../../Modal/contextApi/adminContext";
import "./Style/addUpdateProduct.css";
export const AddUpdateProduct = ({ taskName }) => {
  const admin = useContext(adminContext);
  const [FormData, setFormData] = admin.formDataState;
  const [isFileChange, setisFileChange] = useState(false);

  useEffect(() => {
    setFormData(() => {
      return {
        image: {},
        id: "",
        title: "",
        description: "",
        stock: "",
        price: "",
        category: "",
      };
    }, [taskName]);
  }, []);

  const onChangeHandler = (e) => {
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
    if (!isFileChange) {
      setFormData((pre) => {
        delete pre.image;
        return pre;
      });
    }
    if (confirm("Are you want to add this data?")) {
      try {
        let response;
        if (taskName == "Update Product") {
          console.log("client side form data: ", FormData);
          response = await admin.updateproduct(FormData);
          console.log("Product updated ", response);
          alert(`Product updated `);
        } else if (taskName == "Add Product") {
          response = await admin.add_product(FormData);
          console.log("Product added", response);
          alert(`Product Added `);
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
          />
        </div>
        <div className="mb-3">
          Id
          <input
            type="number"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter product id"
            name="id"
            value={FormData.id}
            onChange={onChangeHandler}
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
          />
        </div>
        <div>
          Category
          <select
            className="form-select"
            aria-label="Default select example"
            name="category"
            value={FormData.category}
            defaultValue={"none"}
            onChange={onChangeHandler}
          >
            <option defaultValue={"none"} disabled>
              Select product category
            </option>
            <option defaultValue={"none"}>none</option>
            <option value="electronic">Electronic</option>
            <option value="man_clothes">Man clothes</option>
            <option value="women_clothes">Women clothes</option>
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
