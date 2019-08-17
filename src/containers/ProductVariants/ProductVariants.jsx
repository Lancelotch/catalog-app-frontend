import React, { useState } from "react";
import { Card, Row, Col, Tag, Button, Select, Icon } from "antd";
import "./style.sass";
import variantColor from "../../dataSource/variantColor";
import variantSize from "../../dataSource/variantSize";

const { Option } = Select;

const ProductVariants = props => {
  const handleChangeSelect = (event, key) => {
    props.setFieldValue(key, event);
  };

  return (
    <Card title={"Product Variant & Image"}>
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
                    <div className="cd-select-variant-color" style={{background: `#${color.id}`}}/> {color.name}
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
          <br/>
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
        </div>
      </Card>
      <div style={{padding: 24, textAlign: "right"}}>
        <Button icon="plus"> Variant</Button>
      </div>
      
    </Card>
  );
};

export default ProductVariants;
