import React, { useState } from "react";

const ProductContext = React.createContext();

const GlobalStateProduct = props => {
  const productVariant = {
    color: "",
    sizes: [],
    images: {
      front: "",
      back: "",
      other: ""
    }
  };
  const initialValues = {
    productName: "",
    description: "",
    category: "",
    price: 0,
    variants: [{...productVariant}],
    images: []
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
      {props.children}
    </ProductContext.Provider>
  );
};

export default GlobalStateProduct;
export { ProductContext };
