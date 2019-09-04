import React, { useState, Fragment, useContext } from "react";
import { withRouter } from "react-router-dom";
import { Formik } from "formik";
import { withFirebase } from "../../hoc/Firebase";
import { compose } from "recompose";
import { schemaProduct } from "./schema";
import { Form, Select, Button } from "antd";
import ProductInformation from "../ProductInformation";
import "./style.sass";
import ProductVariants from "../ProductVariants";
import { ProductContext } from "../../pages/cms/AddProduct/GlobalStateProduct";
const { Option } = Select;

const FormProduct = props => {
  const context = useContext(ProductContext);
  console.log(context);
  const handleSubmit = () => {};
  return (
    <Fragment>
      <Formik
        enableReinitialize
        initialValues={context.initialState}
        validationSchema={schemaProduct}
        onSubmit={(val) => {
          console.log(val)
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          onReset,
          handleReset
        }) => {
          return (
            <Form onSubmit={handleSubmit}>
            {console.log("values",values)}
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
                  values={values.variants}
                  onReset={onReset}
                  handleReset={handleReset}
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
