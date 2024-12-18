import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  ApartmentOutlined,
  DatabaseOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { CompanyLogo } from "./CompanyLogo";

const { Sider } = Layout;

const SideNav: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const crudOptions = [
    { key: "4", label: <Link to="/users">Users</Link> },
    { key: "5", label: <Link to="/positions">Positions</Link> },
    { key: "6", label: <Link to="/departments">Departments</Link> },
    { key: "7", label: <Link to="/areas">Areas</Link> },
  ];

  const items = [
    { key: "1", icon: <UserOutlined />, label: <Link to="/">Dashboard</Link> },
    {
      key: "2",
      icon: <ApartmentOutlined />,
      label: <Link to="/org-chart">Hierarchical Chart</Link>,
    },
    {
      key: "sub1",
      icon: <DatabaseOutlined />,
      label: "CRUD",
      children: crudOptions,
    },
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={toggleCollapsed}
      breakpoint="lg"
      collapsedWidth="80"
      trigger={null}
      style={{ color: "white" }}
    >
      <CompanyLogo />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={items}
      ></Menu>
      <div
        className="ant-layout-sider-trigger"
        style={{
          position: "fixed",
          bottom: 0,
          zIndex: 1,
          width: collapsed ? 80 : 200,
          transition: "all 0.2s",
        }}
        onClick={toggleCollapsed}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
    </Sider>
  );
};

export default SideNav;
