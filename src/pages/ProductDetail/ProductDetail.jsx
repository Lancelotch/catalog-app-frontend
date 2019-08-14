import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import { Lightbox } from "react-modal-image";

const ProductDetail = () => {
  const [imageGalleries, setImageGalleries] = useState();
  const [idxSlide, setIdxSlide] = useState(0);
  const [modalImage, setModalImage] = useState({open :false, src: ""});

  const imageList = [
    {
      original:
        "https://imager-next.freetls.fastly.net/images/resized/480/632ae360-9fc7-460e-b674-909db5b07ff1",
      thumbnail:
        "https://imager-next.freetls.fastly.net/images/resized/480/632ae360-9fc7-460e-b674-909db5b07ff1"
    },
    {
      original:
        "https://imager-next.freetls.fastly.net/images/resized/480/7b509332-e209-4a80-9633-c5a898cd0b8e",
      thumbnail:
        "https://imager-next.freetls.fastly.net/images/resized/480/7b509332-e209-4a80-9633-c5a898cd0b8e"
    }
  ];

  useEffect(() => {
    setImageGalleries(imageList);
  }, []);

  const handleOnClickImageGalery = (src)=> {
    setModalImage({...modalImage, src, open: true});
  }

  return (
    <div>
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
        onClick={event => {handleOnClickImageGalery(event.target.src)}}
      />
      {modalImage.open && (
        <Lightbox
          medium={modalImage.src}
          large={modalImage.src}
          alt={"some name dress"}
          onClose={() => {setModalImage({...modalImage, open: false});}}
          hideDownload
        />
      )}
    </div>
  );
};

export default ProductDetail;
