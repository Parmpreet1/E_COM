import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseurl = "/products";
const initialState = {
  cartItems: [
    // {
    //   _id: 1,
    //   title: "Mens Casual Premium Slim Fit T-Shirts",
    //   description:
    //     'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",\r\n"category": "men\'s clothing',
    //   category: "men_clothes",
    //   price: 549,
    //   quantity: 1,
    //   total_price: 549
    // },
  ],
  totalAmount:0
  
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    totalAmount:(s)=> {
        let total=s.cartItems?.reduce((price: Number, pro: any) => {
          return (price = pro.total_price + price);
        }, 0);
        total=total.toString()
        s.totalAmount= parseInt(total)
    },
    incQuantity: (s, id) => {
      const index = s.cartItems.findIndex((pro) => pro._id == id.payload);
      const pro=s.cartItems[index]
      ++pro.quantity;
      pro.total_price=pro.quantity*pro.price
      
    },
    decQuantity: (s, id) => {
      const index = s.cartItems.findIndex((pro) => pro._id == id.payload);
      const pro=s.cartItems[index]
      --pro.quantity;
      pro.total_price=pro.quantity*pro.price
    },
    setCartItems:(s,product)=>{
      const isPresent=s.cartItems.find(pro=>pro._id==product.payload._id)
      if(!isPresent){
        const pro={...product.payload}
        pro.quantity="1"
        pro.total_price=pro.price
        console.log(pro)
        s.cartItems.push(pro)
        alert("Product added to cart")
      }
      else{
        alert("Product already present in cart")
      }
    },
    deleteCartItem:(s,_id)=>{
      const index = s.cartItems.findIndex((pro) => pro._id == _id.payload);
      s.cartItems.splice(index,1)
    },
    initializeCart:(s,userCart)=>{
      s.cartItems=userCart.payload
    }
  },
});
export const cartAction = cartSlice.actions;
export default cartSlice.reducer;
