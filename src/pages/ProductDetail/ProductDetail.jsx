import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import { Lightbox } from "react-modal-image";
import { Card, Button, Collapse } from "antd";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { dummyProductDetail } from "../../dataSource/dummyProductDetail";
import "./style.sass";
import VariantColor from "../../components/VariantColor/VariantColor";
import VariantSize from "../../components/VariantSize/VariantColor";
import Testimony from "../../components/Testimony/Testimony";

const { Panel } = Collapse;

const ProductDetail = props => {
  const productId = props.match.params.productId;
  const [imageGalleries, setImageGalleries] = useState();
  const [idxSlide, setIdxSlide] = useState(0);
  const [modalImage, setModalImage] = useState({ open: false, src: "" });
  const [dataProduct, setDataProduct] = useState();
  const [imagesByColor, setImagesByColor] = useState();

  useEffect(() => {
    const productById = dummyProductDetail.find(product => {
      return product.id === productId;
    });
    setDataProduct(productById);
  }, []);

  useEffect(() => {
    dataProduct && setImagesByColor(dataProduct.images[0]);
  }, [dataProduct]);

  useEffect(() => {
    imagesByColor && convertImageGalleries();
  }, [imagesByColor]);

  const convertImageGalleries = () => {
    const imagesByColorWithoutId = imagesByColor;
    const imageList = [];
    Object.values(imagesByColorWithoutId).forEach((image, idx) => {
      idx > 0 &&
        imageList.push({
          original: image,
          thumbnail: image
        });
    });
    setImageGalleries(imageList);
  };

  const handleOnClickImageGalery = src => {
    setModalImage({ ...modalImage, src, open: true });
  };

  const actionVariantColor = idColor => {
    setImagesByColor(() =>
      dataProduct.images.find(image => image.idColor === idColor)
    );
  };

  const actionVariantSize = size => {};

  return (
    <React.Fragment>
      {dataProduct && imageGalleries && (
        <React.Fragment>
          <Card
            title={
              <React.Fragment>
                <span>{dataProduct.name}</span>
                <br />
                <span>{dataProduct.price}</span>
              </React.Fragment>
            }
            cover={
              <ImageGallery
                startIndex={idxSlide}
                showFullscreenButton={false}
                showPlayButton={false}
                onSlide={idx => setIdxSlide(idx)}
                lazyLoad={true}
                items={imageGalleries}
                disableArrowKeys={true}
                showNav={false}
                useBrowserFullscreen
                onClick={event => {
                  handleOnClickImageGalery(event.target.src);
                }}
              />
            }
          >
            {modalImage.open && (
              <Lightbox
                medium={modalImage.src}
                large={modalImage.src}
                alt={"some name dress"}
                onClose={() => {
                  setModalImage({ ...modalImage, open: false });
                }}
                hideDownload
              />
            )}
          </Card>
          <Card>
            <span>Pilih variant warna & ukuran :</span>
            <br />
            <span>Warna :</span>
            <VariantColor
              colors={dataProduct.variant.colors}
              onClick={actionVariantColor}
            />
            <br />
            <span>Ukuran :</span>
            <VariantSize
              sizes={dataProduct.variant.sizes}
              onClick={actionVariantSize}
            />
          </Card>
          <Card>
            <Button
              icon="heart"
              size="large"
            >
              Simpan
            </Button>
            <Button type="primary" size="large" >
              Beli Sekarang
            </Button>
          </Card>
          <Collapse defaultActiveKey={['1']}>
            <Panel header="Detail & Ukuran" key={1}>
              <span>{dataProduct.description}</span>
            </Panel>
          </Collapse>
          <Card>
                <span>{`Testimony Sista (${dataProduct.testimonies.length})`}</span>
              <Testimony testimonies={dataProduct.testimonies} />
          </Card>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default compose(withRouter)(ProductDetail);
