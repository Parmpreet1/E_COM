import React from "react";
import { Routes, Route } from "react-router-dom";
import { AddUpdateProduct } from "./components/AddUpdateProduct";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { Login } from "./pages/admin/Login";
import { UpdateProduct } from "./pages/admin/UpdateProduct";
import { Home } from "./pages/homepage/Home";
import { UserLogin } from "./pages/user/UserLogin";
import "./MainContent.css";
export const MainContent = () => {
  return (
    <div className="content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route
          path="/add_product"
          element={<AddUpdateProduct taskName={"Add Product"} _id={""} />}
        />
        <Route path="/user_login" element={<UserLogin />} />
        <Route path="/update_product/:_id" element={<UpdateProduct />} />
      </Routes>
    </div>
  );
};
