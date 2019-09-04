import React, { useState, useContext, Fragment } from "react";
import { Card, Row, Col, Tag, Button, Select } from "antd";
import "./style.sass";
import variantColor from "../../dataSource/variantColor";
import variantSize from "../../dataSource/variantSize";
import Upload from "../../components/Upload";
import { withFirebase } from "../../hoc/Firebase";
import { compose } from "recompose";
import { ErrorMessage } from "formik";
import { ProductContext } from "../../pages/cms/AddProduct/GlobalStateProduct";
const { Option } = Select;

const ProductVariant = props => {
  const [imageUrl, setImageUrl] = useState([]);
  const [loading, setLoading] = useState([]);
  const [disable, setDisable] = useState([]);
  const [statusFile, setStatusFile] = useState(false);
  const [statusSize, setStatusSize] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState([]);

  const uploadList = [
    { name: "front", label: "Front" },
    { name: "back", label: "Back" },
    { name: "other", label: "Other" }
  ];

  const beforeUpload = file => {
    const isPng = file.type === "image/png";
    const isJpeg = file.type === "image/jpeg";
    const isJPG = file.type === "image/jpg";
    const isLt2M = file.size <= 3145728;
    if (!isJPG && !isJpeg && !isPng) {
      timeOut(setStatusFile, 5000);
      return false;
    }
    if (!isLt2M) {
      timeOut(setStatusSize, 5000);
      return false;
    }
  };

  const timeOut = (setState, time) => {
    setState(true);
    setTimeout(() => {
      setState(false);
    }, time);
  };

  const handleChange = (info, name) => {
    let loadingTemp = [...loading];
    if (info.file.status === "uploading") {
      loadingTemp[name] = true;
      setLoading(loadingTemp);
      return;
    }
    if (info.file.status === "done") {
      let imageUrlTemp = [...imageUrl];

      let disableTemp = [...disable];
      getBase64(info.file.originFileObj, function() {
        imageUrlTemp[name] = info.file.response;
        loadingTemp[name] = false;
        disableTemp[name] = true;
        setImageUrl(imageUrlTemp);
        setLoading(loadingTemp);
        setDisable(disableTemp);
        props.setFieldValue(name, info.file.response);
      });
    }
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const remove = () => {
    setImageUrl("");
    setDisable(false);
  };

  const handleChangeSelect = (event, key) => {
    props.setFieldValue(key, event);
  };

  const customUpload = ({ onError, onSuccess, file }, index) => {
    let tempLoadingEdit = [...loadingEdit];
    tempLoadingEdit[index] = true;
    setLoadingEdit(tempLoadingEdit);
    const uploadTask = props.firebase
      .uploadProduct()
      .child(file.name)
      .put(file);
    uploadTask.on(
      "state_changed",
      snapshot => {
        tempLoadingEdit[index] = false;
        setLoadingEdit(tempLoadingEdit);
        onSuccess(null, snapshot);
      },
      error => {
        console.log(error);
        onError(error);
      },
      () => {
        props.firebase
          .uploadProduct()
          .child(file.name)
          .getDownloadURL()
          .then(url => {
            onSuccess(url);
          });
      }
    );
  };

  return (
    <Fragment>
      <Card
        title={
          <Fragment>
            <span>Variant - {props.index + 1} </span>{" "}
            {props.index > 0 && (
              <span style={{ float: "right" }}>
                <Button>Cancle</Button>
              </span>
            )}
          </Fragment>
        }
      >
        <div style={{ padding: 24 }}>
          <Row type="flex" align="middle">
            <Col span={5}>
              <Row type="flex" align="middle">
                <span className="cd-label-content">Color</span>
                <Tag className="cd-tag">required</Tag>
              </Row>
            </Col>
            <Col md={19}>
              <Select
                name={`variants.${props.id}.color`}
                onChange={e =>
                  handleChangeSelect(e, `variants.${props.id}.color`)
                }
                onBlur={props.handleBlur}
              >
                {variantColor.map(color => (
                  <Option key={color.id} value={color.id}>
                    <div
                      className="cd-select-variant-color"
                      style={{ background: `#${color.id}` }}
                    />{" "}
                    {color.name}
                  </Option>
                ))}
              </Select>
              <ErrorMessage
                name={`variants.${props.id}.color`}
                render={message => (
                  <span className="cd-text-error-message">{message}</span>
                )}
              />
            </Col>
          </Row>
          <br />
          <Row type="flex" align="middle">
            <Col span={5}>
              <Row type="flex" align="middle">
                <span className="cd-label-content">Sizes</span>
                <Tag className="cd-tag">required</Tag>
              </Row>
            </Col>
            <Col md={19}>
              <Select
                name={`variants.${props.id}.sizes`}
                mode="multiple"
                onChange={e =>
                  handleChangeSelect(e, `variants.${props.id}.sizes`)
                }
                onBlur={props.handleBlur}
              >
                {variantSize.map(size => (
                  <Option key={size} value={size}>
                    {size}
                  </Option>
                ))}
              </Select>
              <ErrorMessage
                name={`variants.${props.id}.sizes`}
                render={message => (
                  <span className="cd-text-error-message">{message}</span>
                )}
              />
            </Col>
          </Row>
          <br />
          <Row type="flex" align="middle">
            <Col span={5}>
              <Row type="flex" align="middle">
                <span className="cd-label-content">Images</span>
                <Tag className="cd-tag">required</Tag>
              </Row>
            </Col>
            <Col md={19}>
              <Row type="flex">
                {uploadList.map((upload) => (
                  <div key={`variants.${props.id}.images.${upload.name}`}>
                    <Upload
                      name={`variants.${props.id}.images.${upload.name}`}
                      imageUrl={imageUrl[`variants.${props.id}.images.${upload.name}`]}
                      onChange={info => handleChange(info, `variants.${props.id}.images.${upload.name}`)}
                      loading={loading[`variants.${props.id}.images.${upload.name}`]}
                      customRequest={({ onError, onSuccess, file }) =>
                        customUpload({ onError, onSuccess, file }, `variants.${props.id}.images.${upload.name}`)
                      }
                      type="default"
                      beforeUpload={beforeUpload}
                      disabled={disable[`variants.${props.id}.images.${upload.name}`]}
                      loadingEdit={loadingEdit[`variants.${props.id}.images.${upload.name}`]}
                    />
                    <br />
                    <span>{upload.label}</span>
                    <br />
                    <ErrorMessage
                      name={`variants.${props.id}.images.${upload.name}`}
                      render={message => (
                        <span className="cd-text-error-message">{message}</span>
                      )}
                    />
                  </div>
                ))}
              </Row>
            </Col>
          </Row>
        </div>
      </Card>
    </Fragment>
  );
};

export default compose(withFirebase)(ProductVariant);
