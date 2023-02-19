import React, { useState } from "react";
// import {increment,decrement} from '../../Controller/features/counter/CounterSlice'
import { useDispatch, useSelector } from "react-redux";
import no_image from "../../assets/no_image.jpg";
import { cartAction } from "../../Controller/features/user/CartSlice";
export const CartCard = ({product}:any) => {
 
  
  const dispatch=useDispatch()
  // console.log("Parent ")
  const inc=(e)=>{
    e.stopPropagation()
    dispatch(cartAction.incQuantity(product._id))
    
  }
  const dec=(e)=>{
    e.stopPropagation()
    if(product.quantity>1){
      dispatch(cartAction.decQuantity(product._id))
    }
  }
  const deletePro=(e)=>{
    e.stopPropagation()
    dispatch(cartAction.deleteCartItem(product._id))
  }
  return (
    <div
      className="card mb-0 mt-0 dropdown-item bg-body"
      style={{ maxWidth: "600px", maxHeight: "210px" }}
    >
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={`data:${product.image?.content_type};base64,${product.image?.data}`}
            className="img-fluid rounded-start"
            style={{ maxHeight: "160px" }}
            alt="..."
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title overflow-hidden">{product.title}</h5>
            
            <p className="card-text" style={{ maxHeight: "23px" }}>
              {product.description}
            </p>
            <div className=" d-flex  justify-content-center">
              <p className="" style={{ marginTop: "0", marginBottom: "0" }}>
                <b>Price: </b>₹{product.price} <b>Total Price: </b>₹{product.total_price}
              </p>
            </div>
            <div
              className="d-flex justify-content-center gap-1"
              style={{ marginTop: "-8%" }}
            >
              <button className="" style={{ width: "30px", height: "30px" }} onClick={dec}>
                -
              </button>
              <input
                type="text"
                className=" text-center"
                value={product.quantity}
                readOnly
                style={{ width: "30px", height: "30px" }}
              />
              <button className="" style={{ width: "30px", height: "30px" }} onClick={inc}>
                +
              </button>
            </div>
            <button className=" position-absolute btn btn-danger" style={{top:"140px",right:"15px"}} onClick={deletePro}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};
