import React, { useContext, useEffect } from "react";
// import chair from "../../assets/chair.jpg";
import no_image from "../../assets/no_image.jpg"
import { adminContext } from "../../Modal/contextApi/adminContext";
import { Link } from "react-router-dom";
import './Style/productCard.css'
import { useDispatch } from "react-redux";
import { cartAction } from "../../Controller/features/user/CartSlice";
export const Product_card = ({ product }) => {
  const admin = useContext(adminContext);
  const dispatch=useDispatch()
  const image = product.image;

  const image_bash64 = `data:${image?.content_type};base64,${image?.data}`;
  let newImage=no_image;
  if(admin.FileChangeState[0]&&!image?.data){
    if(!image){
      newImage=no_image
    }
    else{
      newImage=URL.createObjectURL(image)
    }
  }
  //buttons events
  const addToCart=()=>{
    dispatch(cartAction.setCartItems(product))
  }
  
  return (
    <div className="card" style={{ width: "20rem" }}>
      {/* <img src={chair} className="card-img-top" alt="..." /> */}
      <Link to={`/${product._id}`}>
      <img src={image?.content_type? image_bash64 : newImage} className="card-img-top" alt="..." height={"300vh"}/>
      </Link>
      <div className="card-body">
        <h5 className="card-title my-0" style={{height:"50px",overflow:"hidden"}}>{product.title}</h5>
        <p className="card-text">{product.description.slice(0, 200)}</p>
      </div>
<hr />
      <div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <b>Category: </b>
            {product.category}
          </li>
          <li className="list-group-item">
            <b>Price: </b>₹{product.price}
          </li>
        </ul>
        
        <div className={`card-body ${admin.isAdmin ? "d-none" : "d-flex justify-content-between"}`}>
          <a href="#" className="btn btn-primary">
            Add to Wishlist
          </a>
          <button className="btn btn-primary" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
        <div className={`card-body ${admin.isAdmin ? "d-flex justify-content-between" : "d-none"}`}>
          <button
            className="btn btn-danger"
            onClick={() => {
              admin.delete_product(product._id);
            }}
          >
            Delete
          </button>
          <Link
            to={`/update_product/${product._id}`}
            className="btn btn-primary"
          >
            Update
          </Link>
        </div>
      </div>
    </div>
  );
};
