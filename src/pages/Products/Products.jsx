import React, { Fragment, useEffect, useState } from "react";
import Product from "../../components/Product";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../../hoc/Firebase";
import { compose } from "recompose";
import PATH_URL from "../../routes/path";
import { Card, Select } from "antd";
import "./style.sass";

const { Option } = Select;

const Products = props => {
  const [products, setProducts] = useState();
  useEffect(() => {
    props.firebase.products().on("value", snapshot => {
      const productList = snapshot.val();
      setProducts(productList);
    });
  },[]);
  return (
    <Fragment>
      <Card>
        <Select className="mp-select-products" placeholder="filter">
          <Option value="cheaper">Termurah</Option>
          <Option value="expensive">Termahal</Option>
          <Option value="newest">Terbaru</Option>
          <Option value="oldest">Terlama</Option>
        </Select>
        <Select className="mp-select-products" placeholder="category">
          <Option value="mini_dress">Mini Dress</Option>
          <Option value="large_dress">Large Dress</Option>
        </Select>
      </Card>
      {products &&
        products.map(product => (
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

export default compose(
  withRouter,
  withFirebase
)(Products);
