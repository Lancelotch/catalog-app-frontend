import React, { Fragment } from "react";
import "./style.sass";

const VariantSize = ({ sizes }) => {
  return (
    <Fragment>
      {sizes.map(size => (
        <p key={size} className="cd-variant-size">
          {size}
        </p>
      ))}
    </Fragment>
  );
};

export default VariantSize;
