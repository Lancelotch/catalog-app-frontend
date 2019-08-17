import React, { useState } from "react";
import { Card, Row, Col, Tag, Input, Select } from "antd";
import "./style.sass";
import categories from "../../dataSource/category";

const { TextArea } = Input;
const { Option } = Select;

const ProductInformation = props => {
  const [price, setPrice] = useState();
  const handleChange = (event, key) => {
    props.setFieldValue(key, event.target.value);
  };

  const handleChangeSelect = (event, key) => {
    props.setFieldValue(key, event);
  };

  const handleChangePrice = (event, key, setState) => {
    const value = event.target.value;
    const toNumber = convertToNumber(value);
    const convert = numberWithSeparator(toNumber);
    setState(convert);
    props.setFieldValue(key, toNumber);
  };

  const convertToNumber = valueString =>
    Number(valueString.replace(/[^0-9]/g, ""));

  const numberWithSeparator = number => {
    var parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  return (
    <Card title={"Product Information"}>
      <div style={{ padding: 24 }}>
        <Row type="flex" align="middle">
          <Col span={5}>
            <Row type="flex" align="middle">
              <span className="cd-label-content">Name</span>
              <Tag className="cd-tag">required</Tag>
            </Row>
          </Col>
          <Col md={19}>
            <Input
              name="productName"
              value={props.values.productName}
              onChange={e => {
                handleChange(e, "productName");
              }}
              onBlur={props.handleBlur}
              size="large"
              status={
                props.errors.productName && props.touched.productName
                  ? "error"
                  : "default"
              }
            />
            {props.errors.productName && props.touched.productName && (
              <span className="cd-text-error-message">
                {props.errors.productName}
              </span>
            )}
          </Col>
        </Row>
        <br />
        <Row type="flex" align="middle">
          <Col span={5}>
            <Row type="flex" align="middle">
              <span className="cd-label-content">Description</span>
              {/* <Tag className="cd-tag">required</Tag> */}
            </Row>
          </Col>
          <Col md={19}>
            <TextArea
              name="description"
              autosize={{ minRows: 6, maxRows: 6 }}
              maxLength={2000}
              value={props.values.description}
              onChange={e => handleChange(e, "description")}
            />
            {props.errors.description && props.touched.description && (
              <span className="cd-text-error-message">
                {props.errors.description}
              </span>
            )}
          </Col>
        </Row>
        <br />
        <Row type="flex" align="middle">
          <Col span={5}>
            <Row type="flex" align="middle">
              <span className="cd-label-content">Category</span>
              <Tag className="cd-tag">required</Tag>
            </Row>
          </Col>
          <Col md={19}>
            <Select
              name="category"
              onChange={e => handleChangeSelect(e, "category")}
              onBlur={props.handleBlur}
            >
              {categories.map(category => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
            {props.errors.category && (
              <span className="cd-text-error-message">
                {props.errors.category}
              </span>
            )}
          </Col>
        </Row>
        <br />
        <Row type="flex" align="middle">
          <Col span={5}>
            <Row type="flex" align="middle">
              <span className="cd-label-content">Price</span>
              <Tag className="cd-tag">required</Tag>
            </Row>
          </Col>
          <Col md={19}>
            <Input
              prefix={"Rp"}
              value={price}
              name="price"
              onBlur={props.handleBlur}
              onChange={e => {
                handleChangePrice(e, "price", setPrice);
              }}
              size="large"
              status={
                props.errors.price && props.touched.price ? "error" : "default"
              }
            />
            {props.errors.price && (
              <span className="cd-text-error-message">
                {props.errors.price}
              </span>
            )}
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default ProductInformation;
