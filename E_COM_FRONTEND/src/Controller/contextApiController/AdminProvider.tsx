import axios from "axios";
import React, { useEffect, useState } from "react";
import { adminContext } from "../../Modal/contextApi/adminContext";
const baseurl = "/products";
export const AdminProvider = ({ children }) => {
  const [isAdmin, setisAdmin] = useState(false);
  const [apiResponse, setapiResponse] = useState({ data: [], message: "" });
  const login = () => {
    setisAdmin(true);
  };
  const logout = () => {
    setisAdmin(false);
  };
  const check_login = () => {};

  const updateproduct = async(multipartData: Object) => {
    try{
      const response: resType = await axios.put(`${baseurl}/${multipartData._id}`, multipartData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      displayproducts();
      console.log("Product updated successful")
      return response
    }
    catch(err){
      return err
    }
  };
  const delete_product = async (_id: String) => {
    try {
      if (confirm("Are you realy want to delete this product ?")) {
        await axios.delete(`/products/${_id}`);
        displayproducts();
      }
    } catch (err) {
      console.log(err);
      alert("error in delete");
    }
  };
  const displayproducts = async () => {
    try{
      const response: resType = await axios.get(`${baseurl}`);
      console.log(response);
      setapiResponse(response);
    }
    catch(err){
      setapiResponse(err)
    }
  };
  const getSingleProduct = async (_id: String) => {
    const response: resType = await axios.get(`${baseurl}/${_id}`,{headers:{"Content-Type":"application/json"}});
    return response;
  };
  const add_product = async (multipartData: Object) => {
    const response: resType = await axios.post(baseurl, multipartData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    displayproducts();
    return response;
  };
  const formDataState = useState(
    {
      image: {},
      id: "",
      title: "",
      description: "",
      stock: "",
      price: "",
      category: "",
    }
    );
  //api data
  useEffect(() => {
    displayproducts();
  }, []);
  return (
    <adminContext.Provider
      value={{
        login,
        logout,
        check_login,
        updateproduct,
        delete_product,
        add_product,
        displayproducts,
        getSingleProduct,
        apiResponse,
        formDataState,
        isAdmin,
      }}
    >
      {children}
    </adminContext.Provider>
  );
};
type resType = {
  data: [];
  message: "";
};
