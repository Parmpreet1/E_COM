import React, { memo, useCallback, useContext, useMemo, useState } from "react";
import { Product_card } from "../../components/Product_card";
import "./home.css";
import { adminContext } from "../../../Modal/contextApi/adminContext";
export const Home = () => {
  const admin = useContext(adminContext);
  const [Category, setCategory] = useState("all_products")
  let data=admin.apiResponse.data
  const filterData=data?.filter((product:any)=>{
      return product.category==Category
  })
  const selectCategory=(e:any)=>{
      setCategory(e.target.value)
  }
  data=Category=="all_products"? data:filterData
  const render_data = () => {
    if (data?.length > 0) {
      return data.map((pro: proType) => {
        return <Product_card key={pro._id} product={pro} />;
      });
    } else if (admin.apiResponse?.message) {
      return (
        <>
          <h1 style={{ color: "red" }}>Server not available!</h1>;
        </>
      );
    } 
    else if(admin.apiResponse?.request?.status==200){
      return <h1 style={{ color: "white" }}>No product found</h1>;
      
    }
    else{
      return <h1 style={{ color: "white" }}>Loading...</h1>;
    }
  };

  return (
    <>
      <ul className="nav nav-tabs border-danger" id="myTab" role="tablist">
  <li className="nav-item ">
    <button className={`nav-link bg-transparent text-danger border-bottom-0 ${Category=="all_products"? "active":""}`} id="home-tab" data-toggle="tab" role="tab" aria-controls="home" aria-selected="true" 
    value={'all_products'} onClick={selectCategory}>All Products</button>
  </li>
  <li className="nav-item">
    <button className="nav-link bg-transparent text-danger border-bottom-0" id="profile-tab" data-toggle="tab" role="tab" aria-controls="profile" aria-selected="false" value={'electronics'} onClick={selectCategory}>Electronics</button>
  </li>
  <li className="nav-item">
    <button className="nav-link text-danger bg-transparent border-bottom-0" id="contact-tab" data-toggle="tab" role="tab" aria-controls="contact" aria-selected="false" value={'men_clothes'} onClick={selectCategory}>Men's Clothes</button>
  </li>
   <li className="nav-item">
    <button className="nav-link bg-transparent text-danger border-bottom-0" id="profile-tab" data-toggle="tab" role="tab" aria-controls="profile" aria-selected="false" value={'women_clothes'} onClick={selectCategory}>Women's Clothes</button>
  </li>
  <li className="nav-item">
    <button className="nav-link text-danger bg-transparent border-bottom-0" id="contact-tab" data-toggle="tab" role="tab" aria-controls="contact" aria-selected="false" value={'jewelery'} onClick={selectCategory}>Jewelery</button>
  </li>
</ul>
<div className="tab-content" id="myTabContent">
  <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab"><p className="text-success m-2">Records found: {data?.length}</p><div className="cards">{render_data()}</div></div>
</div>
      
    </>
  );
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
