import React, { Fragment } from "react";
import "./style.sass";
import { Avatar } from "antd";

const Testimony = ({ testimonies }) => {
  return (
    <Fragment>
      {testimonies.map(testimony => (
        <div key={testimony.id}>
            <span><Avatar size="large" src={testimony.avatar} />{testimony.username} {testimony.createdAt}</span>
            <span>{testimony.message}</span>
        </div>
      ))}
    </Fragment>
  );
};

export default Testimony;
