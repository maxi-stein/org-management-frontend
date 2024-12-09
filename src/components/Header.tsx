import React from "react";
import { Layout, Typography } from "antd";

const { Header: AntHeader } = Layout;
const { Title } = Typography;

const Header: React.FC = () => {
  return (
    <AntHeader
      style={{
        background: "#fff",
        padding: 0,
        borderBottomColor: "#e9e9e9",
        borderBottomStyle: "solid",
        borderBottomWidth: "1px",
        boxShadow: "0 1px 4px rgba(0, 21, 41, 0.08)",
      }}
    >
      <Title
        level={4}
        style={{
          margin: "16px 24px",
          fontWeight: 500,
          fontSize: "24px",
          color: "#333",
          letterSpacing: "0.5px",
          lineHeight: "1.5",
        }}
      >
        Organization Chart Manager
      </Title>
    </AntHeader>
  );
};

export default Header;
