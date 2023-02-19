import React from "react";
import { Routes, Route } from "react-router-dom";
import { AddUpdateProduct } from "./components/AddUpdateProduct";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { Login } from "./pages/admin/Login";
import { UpdateProduct } from "./pages/admin/UpdateProduct";
import { Home } from "./pages/homepage/Home";
import { UserLogin } from "./pages/user/UserLogin";
import "./MainContent.css";
import  Staf_list  from "./Staf_list";
import { UserProfile } from "./pages/user/UserProfile";
import { UserWishlist } from "./pages/user/UserWishlist";
import { UserOrders } from "./pages/user/UserOrders";
import { ProductPage } from "./pages/homepage/ProductPage";
export const MainContent = () => {
  return (
    <div className="content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:_id" element={<ProductPage />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route
          path="/add_product"
          element={<AddUpdateProduct taskName={"Add Product"} />}
        />
        <Route path="/user_login" element={<UserLogin />} />
        <Route path="/user_wishlist" element={<UserWishlist />} />
        <Route path="/user_orders" element={<UserOrders />} />
        <Route path="/user_signup" element={<UserProfile/>} />
        <Route path="/user_profile" element={<UserProfile/>} />
        <Route path="/update_profile" element={<UserProfile/>} />
        <Route path="/update_product/:_id" element={<UpdateProduct />} />
        <Route path="/staf_list" element={<Staf_list/>} />
      </Routes>
    </div>
  );
};
