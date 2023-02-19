import axios from "axios";
import React, { memo, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { adminContext } from "../../Modal/contextApi/adminContext";
const baseurl = "/products";
export const AdminProvider = memo(({ children }:any) => {
  const [isAdmin, setisAdmin] = useState(false);
  const [apiResponse, setapiResponse] = useState({ data: [], message: "" });
  const FileChangeState= useState(false);
  const [isFileChange, setisFileChange]=FileChangeState 
  const SearchState = useState("")
  const navigate=useNavigate()
  const login = async(formData:Object) => {
    try{
      const response=await axios.post('/adminLogin',formData)
      console.log(response)
      if(response.data[0]){
        setisAdmin(true);
        sessionStorage.setItem('isAdmin','true')
        navigate('/adminDashboard')
      }
      else{
        alert("Invalid email or password")
      }
    }
    catch(err){
      alert(`Error in admin login: ${err}`)
    }
  };
  const logout = async() => {
    try{
      const response=await axios.get('/adminLogout')
      setisAdmin(false)
      sessionStorage.setItem('isAdmin','false')
      console.log(response)
      navigate("/admin")
    }
    catch(err){
      alert(`server error in session destroy ${err}`)
    }

  };
  const check_login = () => {};

  const updateproduct = async(multipartData: Object) => {
    try{
      const response: resType = await axios.put(`${baseurl}/${multipartData._id}`, multipartData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      displayproducts();
      console.log(response)
      return response
    }
    catch(err){
      return err
    }
  };
  const delete_product = async (_id: String) => {
    try {
      if (confirm("Are you realy want to delete this product ?")) {
        let response=await axios.delete(`/products/${_id}`);
        if (response.data.message){
          alert(`"server error " ${response.data.message}`)
        }
        else{
          displayproducts();
        }
      }
    } catch (err) {
      console.log(err);
      alert("error in delete");
    }
  };
  const displayproducts = async () => {
    try{
      const searchQuery=`?search=${SearchState[0]}`
      const response: resType = await axios.get(`${baseurl}${searchQuery}`);
      console.log(response);
      setapiResponse(response);
    }
    catch(err){
      setapiResponse(err)
      //electrics  mens clothes women clothes
      // arr.filter((elemet)=>{})
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
    let value=sessionStorage.getItem('isAdmin')
    setisAdmin(value=="true")
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
        SearchState,
        apiResponse,
        formDataState,
        isAdmin,
        FileChangeState
      }}
    >
      {children}
    </adminContext.Provider>
  );
});
type resType = {
  data: [];
  message: "";
};
