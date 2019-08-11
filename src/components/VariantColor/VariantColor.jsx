import React, { Fragment } from "react";
import "./style.sass";

const VariantColor = ({ colors, onClick }) => {
  return (
    <Fragment>
      {colors.map(color => (
        <div
          key={color.id}
          className="cd-variant-color"
          style={{ background: color.id }}
          onClick={() => onClick(color.id)}
        />
      ))}
    </Fragment>
  );
};

export default VariantColor;
