import React, { useContext } from "react";
// import chair from "../../assets/chair.jpg";
import no_image from "../../assets/no_image.jpg"
import { Buffer } from "buffer";
import { adminContext } from "../../Modal/contextApi/adminContext";
import { Link } from "react-router-dom";
export const Product_card = ({ product }) => {
  const admin = useContext(adminContext);
  const image = product.image;

  const image_bash64 = `data:${image?.content_type};base64,${image?.data}`;
  return (
    <div className="card" style={{ width: "20rem" }}>
      {/* <img src={chair} className="card-img-top" alt="..." /> */}
      <img src={image?.content_type? image_bash64 : no_image} className="card-img-top" alt="..." height={"300vh"} />
      <div className="card-body">
        <h5 className="card-title my-0">{product.title}</h5>
        <p className="card-text">{product.description.slice(0, 200)}</p>
      </div>

      <br />
      <br />
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
        <div className={`card-body ${admin.isAdmin ? "d-none" : ""}`}>
          <a href="#" className="btn btn-primary mx-1">
            Add to Wishlist
          </a>
          <a href="#" className="btn btn-primary mx-1">
            Add to Cart
          </a>
        </div>
        <div className={`card-body ${admin.isAdmin ? "" : "d-none"}`}>
          <button
            className="btn btn-danger mx-1 float-start"
            onClick={() => {
              admin.delete_product(product._id);
            }}
          >
            Delete
          </button>
          <Link
            to={`/update_product/${product._id}`}
            className="btn btn-primary mx-1 float-end"
          >
            Update
          </Link>
        </div>
      </div>
    </div>
  );
};
