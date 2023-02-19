import { createContext, useState } from "react";

export const adminContext = createContext({
  login(formData:{}) {},
  logout() {},
  check_login() {},
  displayproducts() {},
  updateproduct(multipartData:Object) {},
  delete_product(_id: String) {},
  add_product(multipartData:Object) {},
  getSingleProduct(_id:String) {},
  apiResponse: { data: [], message: "" },
  SearchState:[],
  formDataState: [{
    image: {},
    title: "",
    description: "",
    stock: "",
    price: "",
    category: "",
  },Function],
  isAdmin: false,
  FileChangeState:Array
});
