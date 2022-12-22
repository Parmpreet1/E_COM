import React, { useContext } from "react";
import { userContext } from "../../../Modal/contextApi/userContext";
import "./style/userlogin.css";
export const UserLogin = () => {
  const user = useContext(userContext);
  const onSubmit = (e) => {
    e.preventDefault();
    user.login();
  };
  return (
    <form className="container bg-white p-4 login_user" onSubmit={onSubmit}>
      <h1 className="mb-3">Login User</h1>
      <div className="row mb-3">
        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
          Email
        </label>
        <div className="col-sm-10">
          <input type="email" className="form-control" id="inputEmail3" />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
          Password
        </label>
        <div className="col-sm-10">
          <input type="password" className="form-control" id="inputPassword3" />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-10 offset-sm-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="gridCheck1"
            />
            <label className="form-check-label" htmlFor="gridCheck1">
              Remember login
            </label>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <button type="submit" className="btn btn-primary">
          Sign in
        </button>
      </div>
    </form>
  );
};
