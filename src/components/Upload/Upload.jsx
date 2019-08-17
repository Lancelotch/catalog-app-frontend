import React from "react";
import { Upload as UploadAnt, Icon, Button } from "antd";
import propTypes from "prop-types";
import "./style.sass";

const Upload = props => {
  const uploadButton = (
    <div>
      <Icon type={props.loading ? "loading" : "plus"} />
    </div>
  );

  const imageUpload = (
    <div className="cd-container-upload">
      {props.type === "no-style" ? (
        <>
          <img src={props.imageUrl} alt="avatar" />
          <div className="cd-top-icon">
            <Icon
              type="camera"
              onClick={() => props.editImage(props.indexVariant, props.index)}
              className="cd-camera-icon"
            />
            <Icon
              type="delete"
              onClick={() => props.remove(props.index, props.imageUrl)}
              className="cd-delete-icon"
            />
          </div>
          {props.loadingEdit ? (
            <div className="cd-container-loading">
              <Icon className="cd-loading-edit" type={"loading"} />
            </div>
          ) : null}
        </>
      ) : (
        <>
          <img src={props.imageUrl} alt="avatar" />
          <div className="cd-top-icon">
            <Icon
              type="camera"
              onClick={() => props.editImage(props.index)}
              className="cd-camera-icon"
            />
            <Icon
              onClick={() => props.remove(props.index)}
              type="delete"
              className="cd-delete-icon"
            />
          </div>
          {props.loadingEdit ? (
            <div className="cd-container-loading">
              <Icon className="cd-loading-edit" type={"loading"} />
            </div>
          ) : null}
          <Button
            width="100%"
            onClick={() => props.changeDefault(props.index, props)}
            className={
              props.type === "default"
                ? "cd-btn-upload"
                : "cd-btn-upload-non-default"
            }
          >
            {props.type === "default" ? "Default" : "Set Default"}
          </Button>
        </>
      )}
    </div>
  );

  return (
    <UploadAnt
      {...props}
      name="avatar"
      listType="picture-card"
      showUploadList={false}
    >
      <div className="cd-inside-upload">
        {props.imageUrl ? imageUpload : uploadButton}
      </div>
    </UploadAnt>
  );
};

Upload.propTypes = {
  name: propTypes.string,
  customeRequest: propTypes.func,
  action: propTypes.string,
  changeDefault: propTypes.func,
  remove: propTypes.func,
  type: propTypes.oneOf(["default", "non-default", "no-style"]),
  disabled: propTypes.bool,
  imageUrl: propTypes.string,
  onChange: propTypes.func,
  beforeUpload: propTypes.func,
  customRequest: propTypes.func
};

export default Upload;
