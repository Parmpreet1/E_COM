import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import no_image from "../../assets/no_image.jpg";
import { userAction } from "../../Controller/features/user/userSlice";
export const UserInfoForm = ({ taskName }) => {
  const profile = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();
  const [Url, setUrl] = useState();
  const [Image, setImage] = useState({})
  useEffect(() => {
    if(taskName=="User Profile"){
      setUrl(profile.profilePic)
    }

    
  }, [])
  
  const onSubmit=(e)=>{
    e.preventDefault()
    
    dispatch(userAction.signup(Image))
  }
  const onChange = (e) => {
    if (e.target.files!=null) {
      const file = e.target.files[0];
      setImage(file)
      const url = URL.createObjectURL(file);
      setUrl(url);
      console.log("profile :", file);
      console.log("url :", url);
      // let valuePair = [e.target.name,file];
      // dispatch(userAction.setProfile(valuePair));
    }
    else{
      const { name, value } = e.target;
    let valuePair = [name, value];
    dispatch(userAction.setProfile(valuePair));
    }
  };
  let Indiastates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry",
  ];
  const getStatesOfIndia = () => {
    return Indiastates.map((state_name) => {
      return (
        <option key={state_name} value={state_name}>
          {state_name}
        </option>
      );
    });
  };
  return (
    <div
      className="container bg-light m-auto my-4 rounded-4 p-4"
      style={{ maxWidth: "1200px", border: "2px solid red" }}
    >
      <form className="row g-3" onSubmit={onSubmit}>
        <h1 className=" text-center">{taskName}</h1>
        <img
          src={Url ? Url : no_image}
          // src={`http://localhost:4000/profilePic/parmsohi1@gmail.com`}
          className="mt-3 mx-2 rounded-3"
          alt="..."
          style={{ width: "250px", height: "220px", border: "1px solid black" }}
        />
        <hr />
        <div className="col-md-6">
          <label htmlFor="formFile" className="form-label">
            Default file input example
          </label>
          <input
            className="form-control"
            type="file"
            id="formFile"
            name="profilePic"
            onChange={onChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="inputEmail4"
            name="name"
            value={profile.name}
            onChange={onChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEmail4"
            name="email"
            value={profile.email}
            onChange={onChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="inputPassword4"
            name="password"
            value={profile.password}
            onChange={onChange}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
            name="address"
            value={profile.address}
            onChange={onChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputCity" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control"
            id="inputCity"
            name="city"
            value={profile.city}
            onChange={onChange}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="inputState" className="form-label">
            State
          </label>
          <select
            id="inputState"
            className="form-select"
            name="state"
            value={profile.state}
            onChange={onChange}
          >
            <option value={"none"}>Choose...</option>
            {getStatesOfIndia()}
          </select>
        </div>
        <div className="col-md-2">
          <label htmlFor="inputZip" className="form-label">
            Pin code
          </label>
          <input
            type="text"
            className="form-control"
            id="inputZip"
            name="pin"
            value={profile.pin}
            onChange={onChange}
          />
        </div>

        <div className="col-12 d-flex justify-content-center">
          <button type="submit" className="btn btn-primary">
            {taskName=="User Profile"?"Update Profile":taskName}
          </button>
        </div>
      </form>
    </div>
  );
};
//type
type profile = {
  email: "";
  password: "";
  profilePic: "";
  name: "";
  address: "";
  city: "";
  state: "";
  pin: "";
};
