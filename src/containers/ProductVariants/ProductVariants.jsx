import React, { useState } from "react";
import { Card, Row, Col, Tag, Button, Select } from "antd";
import "./style.sass";
import variantColor from "../../dataSource/variantColor";
import variantSize from "../../dataSource/variantSize";
import Upload from "../../components/Upload";
import { withFirebase } from "../../hoc/Firebase";
import { compose } from "recompose";
import { FieldArray } from "formik";
import ProductVariant from "../ProductVariant/ProductVariant";

const { Option } = Select;

const ProductVariants = props => {
  return (
    <Card title={"Product Variant & Image"}>
      {props.values.map((variant, index) => (
        <ProductVariant
          handleChange={props.handleChange}
          handleBlur={props.handleBlur}
          errors={props.errors}
          setFieldValue={props.setFieldValue}
          touched={props.touched}
          values={props.variants}
          onReset={props.onReset}
          handleReset={props.handleReset}
          variant={variant}
        />
      ))}
    </Card>
  );
};

export default compose(withFirebase)(ProductVariants);
