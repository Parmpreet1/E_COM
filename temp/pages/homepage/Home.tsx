import React, { memo, useCallback, useContext, useMemo, useState } from "react";
import { Product_card } from "../../components/Product_card";
import "./home.css";
import { adminContext } from "../../Modal/contextApi/adminContext";
export const Home = () => {
  const admin = useContext(adminContext);
  const render_data = () => {
    if (admin.apiResponse?.data?.length > 0) {
      return admin.apiResponse.data.map((pro: proType) => {
        return <Product_card key={pro._id} product={pro} />;
      });
    } else if (admin.apiResponse?.message) {
      return (
        <>
          <h1 style={{ color: "red" }}>Server not available!</h1>;
        </>
      );
    } else {
      return <h1 style={{ color: "white" }}>Loading...</h1>;
    }
  };

  return <div className="cards">{render_data()}</div>;
};
//type define
type proType = {
  _id: "";
  id: Number;
  title: "";
  image: { data: ""; content_type: "" };
  price: Number;
  stock: Number;
  category: "";
};
