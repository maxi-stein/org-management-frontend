import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  ApartmentOutlined,
  DatabaseOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { CompanyLogo } from "./CompanyLogo";

const { Sider } = Layout;
const { SubMenu } = Menu;

const SideNav: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const crudOptions = [
    { label: "Roles", path: "/roles" },
    { label: "Users", path: "/users" },
    { label: "Positions", path: "/positions" },
    { label: "Departments", path: "/departments" },
    { label: "Areas", path: "/areas" },
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={toggleCollapsed}
      breakpoint="lg"
      collapsedWidth="80"
      trigger={null}
    >
      <CompanyLogo />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<ApartmentOutlined />}>
          <Link to="/org-chart">Hierarchical Chart</Link>
        </Menu.Item>
        <SubMenu key="sub1" icon={<DatabaseOutlined />} title="CRUD">
          {crudOptions.map((option) => (
            <Menu.Item key={option.path}>
              <Link to={option.path}>{option.label}</Link>
            </Menu.Item>
          ))}
        </SubMenu>
      </Menu>
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
