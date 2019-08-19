import React, { useState } from "react";

const ProductContext = React.createContext();

const GlobalStateProduct = props => {
  const initialValues = {
    productName: "",
    description: "",
    category: "",
    price: 0,
    variants: [],
    images: []
  };
  const productVariant = {
    color: "",
    sizes: [],
    images: {
      front: "",
      back: "",
      other: ""
    }
  };
  const [initialState, setInitialState] = useState(initialValues);
  const addProductVariant = () => {
    setInitialState({
      ...initialState,
      variants: [...initialState.variants, productVariant]
    });
  };

  return (
    <ProductContext.Provider
      value={{
        initialState: initialState,
        addProductVariant: addProductVariant
      }}
    >
      {props.Children}
    </ProductContext.Provider>
  );
};

export default GlobalStateProduct;
export {ProductContext};