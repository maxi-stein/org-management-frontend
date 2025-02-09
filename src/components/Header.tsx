import React from "react";
import { Button, Layout, Typography } from "antd";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";

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
        borderBottomColor: "#e9e9e9",
        borderBottomStyle: "solid",
        borderBottomWidth: "1px",
        boxShadow: "0 1px 4px rgba(0, 21, 41, 0.08)",
        display: "flex",
        justifyContent: "space-between",
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
      {user && (
        <>
          <div style={{ marginRight: "24px" }}>
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
              Logout
            </Button>
          </div>
        </>
      )}
    </AntHeader>
  );
};

export default Header;
