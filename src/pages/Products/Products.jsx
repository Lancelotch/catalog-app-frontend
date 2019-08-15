import React, { Fragment } from "react";
import Product from "../../components/Product";
import { withRouter } from "react-router-dom";
import { dummyProducts } from "../../dataSource/dummyProducts";
import { compose } from "recompose";
import PATH_URL from "../../routes/path";
import { Card, Select } from "antd";
import "./style.sass";
const { Option } = Select;


const Products = props => {
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
