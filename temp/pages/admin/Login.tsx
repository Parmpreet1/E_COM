import { useContext, useEffect, useState } from "react";
import { adminContext } from "../../Modal/contextApi/adminContext";
import "./style/admin.css";
export const Login = () => {
  const admin = useContext(adminContext);
  const onSubmit = (e) => {
    e.preventDefault();
    admin.login();
  };
  return (
    <div className="login_form container text-center">
      <h1>Admin Panel</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email here"
            name="admin_email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter password here"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};
