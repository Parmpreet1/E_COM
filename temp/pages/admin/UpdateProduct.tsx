import React, { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { adminContext } from "../../Modal/contextApi/adminContext";
import { Product_card } from "../../components/Product_card";
import { AddUpdateProduct } from "../../components/AddUpdateProduct";

export const UpdateProduct = () => {
  const params: { _id: "" } = useParams();
  const admin = useContext(adminContext);
  const [singleProduct, setsingleProduct] = useState(null);
  useMemo(async () => {
    try {
      let response = await admin.getSingleProduct(params._id);
      let formdata_api = await response.data[0];
      setsingleProduct(() => formdata_api);

      // delete formdata_api.image
      // console.log("single product data from api : ", formdata_api);

      // setFormData(await formdata_api);
      // console.log("Form data :", FormData);
    } catch (err) {
      alert(`Product does not delete err:${err}`);
    }
  }, []);
  return (
    <>
      <div className=" container-fluid bg-light">
        <div className="row">
          <div className="col d-flex justify-content-center">
            {singleProduct ? <Product_card product={singleProduct} /> : ""}
          </div>
          <div className="col">
            <AddUpdateProduct
              taskName={"Update Product"}
              _id={params._id}
              formData={singleProduct}
            />
          </div>
        </div>
      </div>
    </>
  );
};
