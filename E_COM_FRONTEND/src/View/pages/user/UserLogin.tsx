import axios from "axios";
import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartAction } from "../../../Controller/features/user/CartSlice";
import {userAction} from "../../../Controller/features/user/userSlice";
import { userContext } from "../../../Modal/contextApi/userContext";
import "./style/userlogin.css";
export const UserLogin = () => {
  const dispatch=useDispatch()
  const [loginInfo, setloginInfo] = useState({email:"",password:""})
  // const user = useContext(userContext);
  const navigate=useNavigate()
  const onSubmit = async(e:any) => {
    e.preventDefault();
       let response:any;
            try{
                response=await axios.post('/userlogin',loginInfo)
                console.log("respons",response)
            }
            catch(err){
                console.log("error in login",err)
            }
            if(response?.data[0]?.profile){
              dispatch(cartAction.initializeCart(response?.data[0]?.cart)) //i will change something in it 
              dispatch(userAction.login(response.data[0]))
              navigate('/')
            }
            else{
              alert("user email or password invalid")
            }
  };
  const onchange=(e)=>{
    const {name,value}=e.target
    setloginInfo((pre)=>{
      return {...pre,[name]:value}
    })
  }
  return (
    <form className="container bg-white p-4 login_user" onSubmit={onSubmit} style={{marginTop:"8%"}}>
      <h1 className="mb-3">Login User</h1>
      <div className="row mb-3">
        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
          Email
        </label>
        <div className="col-sm-10">
          <input type="email" className="form-control" id="inputEmail3" name="email" value={loginInfo.email} onChange={onchange} />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" >
          Password
        </label>
        <div className="col-sm-10">
          <input type="password" className="form-control" id="inputPassword3" name="password" value={loginInfo.password} onChange={onchange} />
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
