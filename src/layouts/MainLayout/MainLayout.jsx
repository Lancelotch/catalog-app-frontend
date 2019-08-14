import React from "react";
import Header from "../../containers/Header";
import "./style.sass";

const MainLayout = (props) => {
  return (
    <div>
      <Header />
        <div className="cd-main-container">{props.children}</div>
    </div>
  );
};

export default MainLayout;
