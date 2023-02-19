import React, { useEffect } from "react";
import { CartCard } from "./CartCard";
import { useSelector, useDispatch } from "react-redux";
import { cartAction } from "../../Controller/features/user/CartSlice";
import { userAction } from "../../Controller/features/user/userSlice";
// import {increment,decrement} from '../../Controller/features/counter/CounterSlice'
export const Cart = () => {
  let paymentStatus = "pending";
  let { cartItems, totalAmount } = useSelector((state) => state.cart);
  const user = useSelector((s) => s.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cartAction.totalAmount());
    dispatch(userAction.setCart(cartItems));
    return () => {};
  }, [cartItems]);

  const Total = totalAmount;
  console.log("total peice", Total);
  if (paymentStatus == "confirmed") {
    const order = {
      items: cartItems,
      orderAmount: Total,
    };
  }
  
  const renderProducts = () => {
    return cartItems.map((pro) => {
      return (
        <li key={pro._id}>
          <CartCard key={pro._id} product={pro} />
        </li>
      );
    });
  };
  const noproduct = () => {
    return (
      <div
        className="card bg-light mb-2 mt-0"
        style={{ width: "30rem", height: "15em" }}
      >
        <div className="card-body">
          <h5 className="card-title">No product added in Cart</h5>
          <p className="card-text">Please add product in cart to buy</p>
        </div>
      </div>
    );
  };
  const onCheckout = (e) => {
    e.preventDefault();

    let order = {
      orderItems: { ...cartItems },
      orderAmount: totalAmount,
      address: user.profile.address,
      customerName: user.profile.name,
      email: user.profile.email,
      orderStatus: "payment confirmed",
    };
    console.log("checkout sucessfull", order);
  };
  return (
    <div className="dropdown dropstart">
      <button
        className="btn"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-cart-dash"
          viewBox="0 0 16 16"
        >
          <path d="M6.5 7a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z" />
          <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
        </svg>
        <i className="bi bi-cart-dash"></i>
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {cartItems.length}
          <span className="visually-hidden">unread messages</span>
        </span>
      </button>
      <ul className="dropdown-menu py-0">
        {cartItems.length > 0 ? renderProducts() : noproduct()}
        <li className=" d-flex justify-content-evenly my-2">
          <div className="mb-0 mt-1">
            <b>Total: </b> ₹{Total}
          </div>
          <button className="btn btn-success" onClick={onCheckout}>
            Checkout
          </button>
        </li>
      </ul>
    </div>
  );
};
