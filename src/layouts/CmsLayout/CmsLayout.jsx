import React, { useState } from "react";
import { Layout, Menu, Icon } from "antd";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import PATH_URL from "../../routes/path";

const { Content, Sider, Header } = Layout;
const { SubMenu } = Menu;

const CmsLayout = props => {
  return (
    <Layout>
      <Header />
      <Layout>
        <Sider>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="shopping" />
                  Product
                </span>
              }
            >
              <Menu.Item key="1" onClick={()=>props.history.push(PATH_URL.ADD_PRODUCT)}>Add Product</Menu.Item>
              <Menu.Item key="2" onClick={()=>props.history.push(PATH_URL.LIST_PRODUCT)}>List Product</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Content>
            <div>{props.children}</div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default compose(withRouter)(CmsLayout);
