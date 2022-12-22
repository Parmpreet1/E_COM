import React, { useContext } from "react";
import ecom_logo from "../../assets/ecom_logo.png";
import "./Style/nav.css";
import { Link } from "react-router-dom";
import { userContext } from "../../Modal/contextApi/userContext";
import { adminContext } from "../../Modal/contextApi/adminContext";
export const Navbar = () => {
  const user = useContext(userContext);
  const admin = useContext(adminContext);
  // let isAdmin = false;
  // let isAdmin = true;
  // let isLogged=false
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link
          className="nav-link active"
          aria-current="page"
          to={`${admin.isAdmin ? "/adminDashboard" : "/"}`}
        >
          <img src={ecom_logo} height={"100vh"} width={"120vh"} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          menu
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* left side items */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav_left mx-3">
            <li className="nav-item">
              <form className="d-flex">
                <input
                  className="form-control me-2 nav_search_bar"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle active"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Product Category
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="#">
                    Clothes
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Laptops
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Smart Phones
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          {/*right side items */}
          <ul className="navbar-nav me-5 mb-2 mb-lg-0">
            <div className={admin.isAdmin ? `d-none` : `d-xl-flex d-lg-flex`}>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle active"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  User
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li className={user.isLogged ? "d-none" : ""}>
                    <Link className="dropdown-item" to={"/user_login"}>
                      Login
                    </Link>
                  </li>
                  <li className={user.isLogged ? "d-none" : ""}>
                    <a className="dropdown-item" href="#">
                      Sign up
                    </a>
                  </li>
                  <li className={user.isLogged ? "" : "d-none"}>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        user.logout();
                      }}
                    >
                      Log out
                    </button>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Shopping Cart
                </a>
              </li>
            </div>
            <li className={`nav-item ${admin.isAdmin ? "d-block" : "d-none"}`}>
              <Link className="nav-link active" to={"/add_product"}>
                Add Product
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link active ${admin.isAdmin ? "d-none" : ""} ${
                  user.isLogged ? "d-none" : ""
                }`}
                to={"/admin"}
              >
                ADMIN
              </Link>
            </li>
            <li className={`nav-item ${admin.isAdmin ? "d-block" : "d-none"}`}>
              <Link className={`nav-link active`} to={"/"}>
                Manage products
              </Link>
            </li>
            <li
              className={`nav-item ${admin.isAdmin ? "d-block" : "d-none"}`}
              onClick={() => admin.logout()}
            >
              <span className="nav-link active">Logout</span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
