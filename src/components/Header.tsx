import React from "react";
import { Button, Layout, Typography } from "antd";
import { useAuth } from "../contexts/authContext";

const { Header: AntHeader } = Layout;
const { Title } = Typography;

const Header: React.FC = () => {
  const { user, logout } = useAuth();

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
          <div>
            <span>{user.firstName + " " + user.lastName}</span>
            <Button type="link" onClick={logout}>
              Logout
            </Button>
          </div>
        </>
      )}
    </AntHeader>
  );
};

export default Header;
