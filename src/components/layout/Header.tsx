import React from "react";
import { Button, Layout, Typography, Space, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useAuth } from "../../contexts/authContext";

const { Header: AntHeader } = Layout;
const { Title, Text } = Typography;

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <AntHeader
      style={{
        background: "#ffffff",
        padding: "0 24px",
        borderBottom: "1px solid #f0f0f0",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: 64,
      }}
    >
      <Title
        level={1}
        style={{
          margin: 0,
          fontSize: "20px",
          fontWeight: 600,
          color: "#1a1a1a",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        Organizational Chart
      </Title>

      {user && (
        <Space align="center" size="middle">
          <Button
            type="text"
            icon={<UserOutlined style={{ color: "#595959" }} />}
            onClick={() => navigate("/profile")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "0 12px",
              height: 40,
              borderRadius: 8,
            }}
          >
            <Text strong style={{ color: "#262626" }}>
              {user.firstName} {user.lastName}
            </Text>
          </Button>

          <Divider type="vertical" style={{ height: 24, margin: 0 }} />

          <Button
            danger
            type="text"
            icon={<LogoutOutlined />}
            onClick={logout}
            style={{
              padding: "0 12px",
              height: 40,
              borderRadius: 8,
              color: "#ff4d4f",
            }}
          >
            Logout
          </Button>
        </Space>
      )}
    </AntHeader>
  );
};

export default Header;
