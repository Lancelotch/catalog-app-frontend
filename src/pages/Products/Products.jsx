import React, { Fragment } from "react";
import Product from "../../components/Product";
import { dummyProducts } from "../../dataSource/dummyProducts";

const Products = () => {
  return (
    <Fragment>
      {dummyProducts.map(product => (
        <Product key = {product.id} product={product} />
      ))}
    </Fragment>
  );
};

export default Products;
