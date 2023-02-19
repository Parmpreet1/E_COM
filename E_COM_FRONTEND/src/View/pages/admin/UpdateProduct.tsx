import React, { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { adminContext } from "../../../Modal/contextApi/adminContext";
import { Product_card } from "../../components/Product_card";
import { AddUpdateProduct } from "../../components/AddUpdateProduct";

export const UpdateProduct = () => {
  const params:any = useParams();
  const admin = useContext(adminContext);
  const formDataState = admin.formDataState
  const [singleProduct, setsingleProduct]=formDataState
  useMemo(async () => {
    try {
      let response:any = await admin.getSingleProduct(params._id);
      let formdata_api = await response.data[0];
      setsingleProduct(() => formdata_api);

      // delete formdata_api.image
      // console.log("single product data from api : ", formdata_api);

      // setFormData(await formdata_api);
      // console.log("Form data :", FormData);
    } catch (err) {
      alert(`Product does not modified err:${err}`);
    }
  }, []);
  
  return (
    <>
      <div className=" container-fluid bg-light rounded-4">
        <div className="row">
        {singleProduct ? (<>
          <div className="col d-flex justify-content-center">
             <Product_card product={singleProduct} /> 
          </div>
          <div className="col">
            
              <AddUpdateProduct
                taskName={"Update Product"}
              />
            
          </div>
          </>
):""}
        </div>
      </div>
    </>
  );
};
