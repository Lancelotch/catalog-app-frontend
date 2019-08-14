import React from "react";
import "./style.sass";
import { Input, Icon, Row, Col } from "antd";

const { Search } = Input;

const Header = () => {
  return (
    <div className="cd-header__container">
      <div className="cd-header__content">
        <Row>
          <Col span={16}>
            <Search
              placeholder="Cari apa sis?"
              onSearch={value => console.log(value)}
              style={{ width: 200 }}
            />
          </Col>
          <Col span={4}>
            <Icon type="heart" key="wishlist" style={{ fontSize: "28px" }} />
          </Col>
          <Col span={4}>
            <Icon type="shopping" style={{ fontSize: "28px" }} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Header;
