import React, { Fragment } from "react";
import Product from "../../components/Product";
import { withRouter } from "react-router-dom";
import { dummyProducts } from "../../dataSource/dummyProducts";
import { compose } from "recompose";
import PATH_URL from "../../routes/path";

const Products = props => {
  return (
    <Fragment>
      {dummyProducts.map(product => (
        <Product
          key={product.id}
          product={product}
          onClick={productId =>
            props.history.push(`${PATH_URL.PRODUCT}/${productId}`)
          }
        />
      ))}
    </Fragment>
  );
};

export default compose(withRouter)(Products);
