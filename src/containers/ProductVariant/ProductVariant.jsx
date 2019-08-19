import React, { useState, Fragment } from "react";
import { Card, Row, Col, Tag, Button, Select } from "antd";
import "./style.sass";
import variantColor from "../../dataSource/variantColor";
import variantSize from "../../dataSource/variantSize";
import Upload from "../../components/Upload";
import { withFirebase } from "../../hoc/Firebase";
import { compose } from "recompose";
import {FieldArray} from 'formik';

const { Option } = Select;

const ProductVariant = props => {
  const [imageUrl, setImageUrl] = useState([]);
  const [loading, setLoading] = useState([]);
  const [disable, setDisable] = useState([]);
  const [statusFile, setStatusFile] = useState(false);
  const [statusSize, setStatusSize] = useState(false);
  const [count, setCount] = useState(0)
  const [loadingEdit, setLoadingEdit] = useState([]);
  const [arrImage, setArrImage] = useState([]);

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

  const handleChange = (info,index,arrayHelpers) => {
    let loadingTemp = [...loading]
    if (info.file.status === 'uploading') {
      loadingTemp[index] = true
      setLoading(loadingTemp)
      return;
    }
    if (info.file.status === 'done' ) {
        let imageUrlTemp = [...imageUrl]
        let disableTemp = [...disable]
        getBase64(info.file.originFileObj, function() {
          imageUrlTemp[index]=info.file.response;
          loadingTemp[index] = false;
          disableTemp[index] = true;
          setImageUrl(imageUrlTemp);
          setLoading(loadingTemp);
          setDisable(disableTemp);
          pushImageToArray(info.file.response,index,arrayHelpers);
        });
    }
  };

  const pushImageToArray = (response,index,arrayHelpers) => {
    uploadList.forEach((upload, idx) => {
      if(idx === index){
        arrayHelpers.push(Object.keys(upload.name).values(response));
      }
    })
  }

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
    let tempLoadingEdit = [...loadingEdit]
    tempLoadingEdit[index] = true
    setLoadingEdit(tempLoadingEdit)
    const uploadTask = props.firebase
      .uploadProduct()
      .child(file.name)
      .put(file);
    uploadTask.on(
      "state_changed",
      snapshot => {
        tempLoadingEdit[index] = false
        setLoadingEdit(tempLoadingEdit)
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

  const editImage = (index) => {
    document.getElementsByClassName("upload")[index].getElementsByTagName("input")[0].click()
  }

  return (
      <Fragment>
      <Card>
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
                name="color"
                onChange={e => handleChangeSelect(e, "color")}
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
              {props.errors.color && (
                <span className="cd-text-error-message">
                  {props.errors.color}
                </span>
              )}
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
                name="size"
                mode="multiple"
                onChange={e => handleChangeSelect(e, "size")}
                onBlur={props.handleBlur}
              >
                {variantSize.map(size => (
                  <Option key={size} value={size}>
                    {size}
                  </Option>
                ))}
              </Select>
              {props.errors.size && (
                <span className="cd-text-error-message">
                  {props.errors.size}
                </span>
              )}
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
              <FieldArray
                name="images"
                render={arrayHelpers => (
                uploadList.map((upload,index) => (
                  <div key={index}>
                    <Upload
                      name={upload.name}
                      imageUrl={imageUrl[index]}
                      onChange={(info) => handleChange(info,index,arrayHelpers)}
                      loading={loading[index]}
                      customRequest={({onError, onSuccess,file})=>customUpload({onError, onSuccess,file},index)}
                      type="default"
                      disabled={disable[index]}
                      remove={remove}
                      beforeUpload={beforeUpload}
                      editImage= {editImage}
                      loadingEdit={loadingEdit[index]}
                    />
                    <br />
                    <span>{upload.label}</span>
                  </div>
                ))
                )}
                />
              </Row>
            </Col>
          </Row>
        </div>
      </Card>
      <div style={{ padding: 24, textAlign: "right" }}>
        <Button icon="plus"> Variant</Button>
      </div>
      </Fragment>
  );
};

export default compose(withFirebase)(ProductVariant);
