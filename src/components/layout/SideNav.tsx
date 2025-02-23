import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  ApartmentOutlined,
  DatabaseOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { CompanyLogo } from "../assets/CompanyLogo";
import { useAuth } from "../../contexts/authContext";

const { Sider } = Layout;

const SideNav: React.FC = () => {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const crudOptions = [
    { key: "4", label: <Link to="/users">Users</Link> },
    { key: "5", label: <Link to="/positions">Positions</Link> },
    { key: "6", label: <Link to="/departments">Departments</Link> },
    { key: "7", label: <Link to="/areas">Areas</Link> },
  ];

  const employeeItems = [
    { key: "1", icon: <UserOutlined />, label: <Link to="/">Home</Link> },
    {
      key: "2",
      icon: <ApartmentOutlined />,
      label: <Link to="/org-chart">Hierarchical Chart</Link>,
    },
    {
      key: "3",
      icon: <SearchOutlined />,
      label: <Link to="/employees/search">Search Employees</Link>,
    },
  ];

  const adminItems = [
    { key: "1", icon: <UserOutlined />, label: <Link to="/">Home</Link> },
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
    {
      key: "3",
      icon: <SearchOutlined />,
      label: <Link to="/employees/search">Search Employees</Link>,
    },
  ];

  // based on the location, set the selected key (allows to keep track when navigating between pages)
  const getSelectedKeys = () => {
    const path = location.pathname;
    if (path === "/") return ["1"];
    if (path === "/org-chart") return ["2"];
    if (path === "/employees/search") return ["3"];
    if (path.startsWith("/users")) return ["4"];
    if (path.startsWith("/positions")) return ["5"];
    if (path.startsWith("/departments")) return ["6"];
    if (path.startsWith("/areas")) return ["7"];
    if (/^\/[a-f\d]{24}$/.test(path)) return ["1"]; //dynamic route /:userId
    return ["1"]; // default value (on first render)
  };

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
      <Menu
        mode="inline"
        selectedKeys={getSelectedKeys()}
        items={user?.role === "admin" ? adminItems : employeeItems}
        theme="dark"
      ></Menu>
      <div
        className="ant-layout-sider-trigger"
        style={{
          position: "fixed",
          bottom: 0,
          zIndex: 1,
          width: collapsed ? 80 : 200,
          transition: "all 0.2s",
          background: "#000000f9",
        }}
        onClick={toggleCollapsed}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
    </Sider>
  );
};

export default SideNav;
