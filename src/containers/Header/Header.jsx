import React from "react";
import "./style.sass";
import { Input, Icon, Row, Col } from "antd";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

const { Search } = Input;

const Header = (props) => {
  return (
    <div className="cd-header__container">
      <div className="cd-header__content">
        <Row>
          <Col span={4}>
            <Icon type="arrow-left" className="cd-header__icon" onClick={props.history.goBack}/>
          </Col>
          <Col span={16}>
            <Search
              placeholder="Cari apa sis?"
              onSearch={value => console.log(value)}
              style={{ width: 200 }}
            />
          </Col>
          <Col span={2}>
            <Icon type="heart" key="wishlist" className="cd-header__icon" />
          </Col>
          <Col span={2}>
            <Icon type="shopping" className="cd-header__icon" />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default compose(withRouter)(Header);
