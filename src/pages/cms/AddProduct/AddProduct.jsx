import React, { Fragment } from "react";
import FormProduct from "../../../containers/FormProduct/FormProduct";
import GlobalStateProduct from "./GlobalStateProduct";

const AddProduct = () => {
  return (
    <Fragment>
      <GlobalStateProduct>
        <FormProduct />
      </GlobalStateProduct>
    </Fragment>
  );
};

export default AddProduct;
