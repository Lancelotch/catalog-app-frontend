import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import "./style.sass";
//
const Product = ({ product }) => {
  const { id, name, price, images, variants, isWishlist } = product;
  const [image, setImage] = useState(images[0]);
  const [showImage, setShowImage] = useState(image.front);
  const changeImageByColor = idColor => {
    setImage(() => images.find(image => image.idColor === idColor));
  };
  useEffect(()=>{
    setShowImage(image.front)
  },[image])

  return (
    <Card key={id} className="cd-card-product__container">
      <img
        className="cd-card-product__media"
        alt={name}
        src={showImage}
        onMouseEnter={() => {
          setShowImage(image.back);
        }}
        onMouseOut={() => {
          setShowImage(image.front);
        }}
      />
      <CardContent>
        <span>{name}</span>
      </CardContent>
      <CardActions>
        <Button onClick={() => changeImageByColor("002")}>Merah</Button>
      </CardActions>
    </Card>
  );
};

export default Product;
