import { createContext, useState } from "react";

export const adminContext = createContext({
  login() {},
  logout() {},
  check_login() {},
  displayproducts() {},
  updateproduct(multipartData:Object) {},
  delete_product(_id: String) {},
  add_product(multipartData:Object) {},
  getSingleProduct(_id:String) {return Promise},
  apiResponse: { data: [], message: "" },
  formDataState: [{
    image: {},
    id: "",
    title: "",
    description: "",
    stock: "",
    price: "",
    category: "",
  },dispatchEvent],
  isAdmin: false,
});
