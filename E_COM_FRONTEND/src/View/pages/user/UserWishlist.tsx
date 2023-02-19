import React from "react";
import { useSelector } from "react-redux";
import { Product_card } from "../../components/Product_card";

export const UserWishlist = () => {
  const user = useSelector((state) => state.user);
  const w = user.wishlist;
  return (
    <div className=" d-flex justify-content-center gap-3 bg-light">
      <Product_card product={w[0]} />
    </div>
  );
};
