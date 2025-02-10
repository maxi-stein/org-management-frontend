import React from "react";
import { Button, Layout, Typography } from "antd";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";

const { Header: AntHeader } = Layout;
const { Title } = Typography;

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <AntHeader
      style={{
        background: "#fff",
        padding: 0,
        borderBottom: "1px solid #e9e9e9",
        boxShadow: "0 1px 4px rgba(0, 21, 41, 0.08)",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Title
        level={4}
        style={{
          margin: "16px 24px",
          fontSize: "24px",
          letterSpacing: "0.5px",
          lineHeight: "1.5",
        }}
      >
        Organization Chart Manager
      </Title>
      {user && (
        <>
          <div
            style={{
              marginRight: "24px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => navigate("/")}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px 0px 0px 10px",
              }}
            >
              {user.firstName + " " + user.lastName}
            </Button>
            <Button
              danger
              type="primary"
              onClick={logout}
              style={{
                border: "1px solid #ccc",
                borderRadius: "0 10px 10px 0",
              }}
            >
              <LogoutOutlined />
              Logout
            </Button>
          </div>
        </>
      )}
    </AntHeader>
  );
};

export default Header;
