import React, { useState } from "react";
import uuidv4 from 'uuid/v4';
import _ from 'lodash';
const ProductContext = React.createContext();

const GlobalStateProduct = props => {
  const productVariant = {
    [uuidv4()] : {
        color: "",
        sizes: [],
        images: {
            front: "",
            back: "",
            other: ""
        }
    }
  };
  const initialValues = {
    productName: "",
    description: "",
    category: "",
    price: 0,
    variants: {...productVariant}
  };

  const [state, setState] = useState(initialValues);
  const addProductVariant = () => {
    setState({
      ...state,
      variants: {...state.variants, productVariant}
    });
  };

  const removeProductVariant = (id) => {
    const removeVariant = _.omit(state, id)
    setState(removeVariant);
  };

  return (
    <ProductContext.Provider
      value={{
        initialState: state,
        addProductVariant: addProductVariant,
        removeProductVariant: removeProductVariant
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default GlobalStateProduct;
export { ProductContext };
