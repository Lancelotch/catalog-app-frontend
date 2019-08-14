import React, { useState, useEffect } from "react";
import { Card, Icon, Row, Col } from "antd";
import "./style.sass";
import VariantColor from "../VariantColor";

const { Meta } = Card;
const Product = (props) => {
  const { id, name, price, images, variant, isWishlist } = props.product;
  const [image, setImage] = useState(images[0]);
  const [showImage, setShowImage] = useState(image.front);
  const actionVariantColor = idColor => {
    setImage(() => images.find(image => image.idColor === idColor));
  };

  useEffect(() => {
    setShowImage(image.front);
  }, [image]);

  return (
    <Card
      style={{ width: "100%", marginBottom: 12 }}
      cover={
        <img
          style={{cursor: "pointer"}}
          alt={name}
          src={showImage}
          onMouseEnter={() => {
            setShowImage(image.back);
          }}
          onMouseOut={() => {
            setShowImage(image.front);
          }}
          onClick={()=>props.onClick(id)}
        />
      }
    >
      <Meta
        title={name}
        description={
          <div>
            <Row>
              <Col xs={20}>
                <VariantColor
                  colors={variant.colors}
                  onClick={actionVariantColor}
                />
              </Col>
              <Col xs={4}>
                <Icon
                  type="heart"
                  key="wishlist"
                  style={{ fontSize: "28px", float: "center" }}
                />
              </Col>
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
