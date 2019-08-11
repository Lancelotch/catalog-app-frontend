import React, { useState, useEffect } from "react";
import { Card, Button, Icon } from "antd";
import "./style.sass";
import VariantColor from "../VariantColor";
import VariantSize from "../VariantSize/VariantColor";

const {Meta} = Card;
const Product = ({ product }) => {
  const { id, name, price, images, variant, isWishlist } = product;
  const [image, setImage] = useState(images[0]);
  const [showImage, setShowImage] = useState(image.front);
  const actionVariantColor = idColor => {
    setImage(() => images.find(image => image.idColor === idColor));
  };
  const actionBuy = () => {
    console.log('buying');
  }
  useEffect(() => {
    setShowImage(image.front);
  }, [image]);

  return (
    <Card
    style={{ width: 300 }}
    cover={
      <img
        alt={name}
        src={showImage}
        onMouseEnter={() => {
          setShowImage(image.back);
        }}
        onMouseOut={() => {
          setShowImage(image.front);
        }}
      />
    }
    actions={[
      <Icon type="setting" key="setting" />,
      <Icon type="heart" key="wishlist" style={{fontSize: "24px"}}/>
    ]}
  >
  <Meta
      title={name}
      description={<div className="cd-card-product__action">
        <span>{price}</span>
        <VariantSize sizes={variant.sizes} />
        <VariantColor colors={variant.colors} onClick={actionVariantColor} />
      </div>}
    />
  </Card>
  );
};

export default Product;
