import React, { useContext } from "react";
import { Card, Button } from "antd";
import "./style.sass";
import { withFirebase } from "../../hoc/Firebase";
import { compose } from "recompose";
import ProductVariant from "../ProductVariant";
import { ProductContext } from "../../pages/cms/AddProduct/GlobalStateProduct";

const ProductVariants = props => {
  const context = useContext(ProductContext);
  //console.log({ values: props.values, objekVal: Object.keys(props.values) });
  return (
    <Card title={"Product Variant & Image"}>
      {Object.keys(props.values).map((variant, index) => (
        <ProductVariant
          key={variant}
          id={variant}
          index={index}
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
      <div style={{ padding: 24, textAlign: "right" }}>
        <Button icon="plus" onClick={() => context.addProductVariant()}>
          {" "}
          Variant
        </Button>
      </div>
    </Card>
  );
};

export default compose(withFirebase)(ProductVariants);
