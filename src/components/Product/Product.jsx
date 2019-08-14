import React, { useState, useEffect } from "react";
import { Card, Button, Icon, Row, Col } from "antd";
import "./style.sass";
import VariantColor from "../VariantColor";
import VariantSize from "../VariantSize/VariantColor";

const { Meta } = Card;
const Product = ({ product }) => {
  const { id, name, price, images, variant, isWishlist } = product;
  const [image, setImage] = useState(images[0]);
  const [showImage, setShowImage] = useState(image.front);
  const actionVariantColor = idColor => {
    setImage(() => images.find(image => image.idColor === idColor));
  };
  const actionBuy = () => {
    console.log("buying");
  };
  useEffect(() => {
    setShowImage(image.front);
  }, [image]);

  return (
    <Card
    hoverable
      style={{ width: "100%" }}
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
    >
    <Meta
        title={name}
        description={
          <div>
          <Row >
            <Col xs={20}><VariantColor colors={variant.colors} onClick={actionVariantColor} /></Col>
            <Col xs={4}><Icon type="heart" key="wishlist" style={{ fontSize: "28px", float: "center" }} /></Col>
          </Row>
          <Row>
            <Col xs={24}>{price}</Col>
          </Row>
          </div>
        }
        />
    </Card>
  );
};

export default Product;
