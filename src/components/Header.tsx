import React from "react";
import { Layout, Typography } from "antd";

const { Header: AntHeader } = Layout;
const { Title } = Typography;

const Header: React.FC = () => {
  return (
    <AntHeader style={{ background: "#fff", padding: 0 }}>
      <Title level={3} style={{ margin: "16px 24px" }}>
        Organization Chart Manager
      </Title>
    </AntHeader>
  );
};

export default Header;
