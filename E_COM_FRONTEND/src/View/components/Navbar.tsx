import React, { useContext } from "react";
import ecom_logo from "../../assets/ecom_logo.png";
import "./Style/nav.css";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../Modal/contextApi/userContext";
import { adminContext } from "../../Modal/contextApi/adminContext";
import { CartCard } from "./CartCard";
import { Cart } from "./Cart";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../Controller/features/user/userSlice";
import axios from "axios";
import { cartAction } from "../../Controller/features/user/CartSlice";
export const Navbar = () => {
  const {user}=useSelector((state)=>state)
  const dispatch=useDispatch()
  // const user = useContext(userContext);
  const admin = useContext(adminContext);
  const [Search, setSearch] = admin.SearchState;
  const onSearch = (e) => {
    e.preventDefault();
    admin.displayproducts();
  };
  const navigate=useNavigate()
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
                  style={{ width: "400px", marginLeft: "2vw" }}
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={Search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <button
                  className="btn btn-outline-success"
                  type="submit"
                  onClick={onSearch}
                >
                  Search
                </button>
              </form>
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
                  {user.isLogged?<img src={user.profile.profilePic} alt="" style={{height:"25px", width:"25px"}} className="rounded-4 mx-2"/>:""}{user.isLogged?(user.profile.name):"User"}
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <div>
                   <li className={user.isLogged ? "" : "d-none"}>
                    <Link className="dropdown-item" to={"/user_profile"}>
                      My Profile
                    </Link>
                  </li>
                  <li className={user.isLogged ? "" : "d-none"}>
                    <Link className="dropdown-item" to={"/user_orders"}>
                      Orders
                    </Link>
                  </li> 
                  </div>
                  <li className={user.isLogged ? "d-none" : ""}>
                    <Link className="dropdown-item" to={"/user_login"}>
                      Login
                    </Link>
                  </li>
                  <li className={user.isLogged ? "d-none" : ""}>
                    <Link className="dropdown-item" to={'/user_signup'}>
                      Sign up
                    </Link>
                  </li>
                  <li className={user.isLogged ? "" : "d-none"}>
                    <button
                      className="dropdown-item"
                      onClick={async() => {
                        const {cart,wishlist}=user
                        const updatedData={cart,wishlist}
                        const response=await axios.put(`/user/${user.profile.email}`,updatedData)
                        console.log("during logout response of updated data",response)
                        dispatch(userAction.logout())
                        dispatch(cartAction.initializeCart([]))
                        navigate('/user_login')
                      }}
                    >
                      Log out
                    </button>
                  </li>
                </ul>
              </li>
              <li className={user.isLogged ? "" : "d-none"}>
                    <Link className=" nav-link active" to={"/user_wishlist"}>
                      Wishlist
                    </Link>
                  </li>
              <li className={user.isLogged ? "" : "d-none"}>
                <Cart/>
              </li>
              
            </div>
            <li className={`nav-item ${admin.isAdmin ? "d-block" : "d-none"}`}>
              <Link className="nav-link active" to={"/add_product"}>
                Add Product
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link
                className={`nav-link active ${admin.isAdmin ? "d-none" : ""} ${
                  user.isLogged ? "d-none" : ""
                }`}
                to={"/admin"}
              >
                ADMIN
              </Link>
            </li> */}
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
