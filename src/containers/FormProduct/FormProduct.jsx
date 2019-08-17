import React, { useState, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Formik } from "formik";
import { withFirebase } from "../../hoc/Firebase";
import { compose } from "recompose";
import { schemaProduct } from "./schema";
import { Form, Select, Button } from "antd";
import ProductInformation from "../ProductInformation";
import "./style.sass";
import ProductVariants from "../ProductVariants/ProductVariants";
const { Option } = Select;

const FormProduct = props => {
  const initialState = {
    productName: "",
    description: "",
    category: "",
    price: 0
  }
  const [initialValueProduct, setinitialValueProduct] = useState(initialState)
  const handleSubmit = () => {};

  return (
    <Fragment>
      <Formik
        initialValues={initialValueProduct}
        validationSchema={schemaProduct}
        onSubmit={({}) => {}}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue
        }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Form.Item>
                <ProductInformation
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  errors={errors}
                  setFieldValue={setFieldValue}
                  touched={touched}
                  values={values}
                />
              </Form.Item>
              <Form.Item>
                <ProductVariants 
                handleChange={handleChange}
                  handleBlur={handleBlur}
                  errors={errors}
                  setFieldValue={setFieldValue}
                  touched={touched}
                  values={values}
                  />
              </Form.Item>
              <div style={{ textAlign: "right", margin: 24 }}>
              <Button type="primary" size="large" htmlType="submit">
                {"Add Product"}
              </Button>
            </div>
            </Form>
          );
        }}
      </Formik>
    </Fragment>
  );
};

export default compose(
  withRouter,
  withFirebase
)(FormProduct);
