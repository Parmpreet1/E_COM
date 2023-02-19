import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  profile: {
    email: "",
    password: "",
    profilePic: "",
    name: "",
    address: "",
    city: "",
    state: "",
    pin: "",
  },
  cart: [],
  orders: [],
  wishlist: [],
  isLogged: false,
};
const emptyState={
    profile: {
      email: "",
      password: "",
      profilePic: "",
      name: "",
      address: "",
      city: "",
      state: "",
      pin: "",
    },
    cart: [],
    orders: [],
    wishlist: [],
    isLogged: false,
}
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (s, Data) => {
      const userData=Data.payload
      s.profile=userData.profile
      s.cart=userData.cart
      s.wishlist=userData.wishlist
      s.orders=userData.orders
      s.isLogged = true;
    },
    logout: (s) => {
      s.isLogged = false;
      s=emptyState
    },
    signup: (s, profilePic) => {
      const profileData = { ...s.profile };
      profileData.profilePic = profilePic.payload;
      console.log(profileData);
      const registerUser = async () => {
        const response = await axios.post("/user", profileData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(response);
        if (response.data.code == "11000") {
          alert(
            "your entered email is already exist please Login with this email"
          );
        }
        else if(response.data.profile){
          alert("user Register successful, now you can able to login")
        }
        return response;
      };
      registerUser();
    },
    setProfile(s, newPair) {
      console.log("userslice ", newPair);
      const [name, value] = newPair.payload;
      s.profile = { ...s.profile, [name]: value };
    },
    setCart(s,tempCart){
      s.cart=tempCart.payload
    },setWishlist(s,Wishlist){
      const userWishlist={...Wishlist.payload}
      s.wishlist=userWishlist
    },setOrders(s,Orders){
      const userOrders={...Orders.payload}
      s.orders=userOrders
    }
  },
});
export const userAction = userSlice.actions;
export default userSlice.reducer;

//type
type profile = {
  email: { type: ""; unique: true; required: true };
  password: { type: ""; required: true };
  profilePic: "";
  name: "";
  address: "";
  city: "";
  state: "";
  pin: Number;
};
