import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  message,
  Card,
  Typography,
  Divider,
  Layout,
  Space,
} from "antd";
import { useAuth } from "../contexts/authContext";
import { axiosInstance } from "../apiServices/http-config";
import { useNavigate } from "react-router-dom";
import { CompanyLogo } from "../components/assets/CompanyLogo";

const { Title, Text } = Typography;
const { Content } = Layout;

const Login: React.FC = () => {
  const { user, login, isLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, isLoading]);

  if (isLoading || user) {
    return null;
  }

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/auth", {
        email: values.email,
        password: values.password,
      });

      login(data.token, data.user);
      message.success("Welcome back! Redirecting...");
      navigate("/");
    } catch (error) {
      message.error("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ff4d4f 0%, #cf1322 100%)",
      }}
    >
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 24,
        }}
      >
        <Card
          style={{
            width: "100%",
            maxWidth: 440,
            borderRadius: 16,
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.18)",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(4px)",
          }}
        >
          <Space
            direction="vertical"
            size="middle"
            style={{ textAlign: "center", width: "100%" }}
          >
            <CompanyLogo />

            <Title level={3} style={{ marginBottom: 8, color: "#1a1a1a" }}>
              Organizational Chart Viewer
            </Title>

            <Text style={{ color: "#595959", marginBottom: 32 }}>
              Sign in to access the platform
            </Text>

            <Form onFinish={onFinish} layout="vertical">
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please enter a valid email address",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined style={{ color: "#ff4d4f" }} />}
                  placeholder="Email address"
                  size="large"
                  style={{ borderRadius: 8, padding: "12px 16px" }}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your password",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ color: "#ff4d4f" }} />}
                  placeholder="Password"
                  size="large"
                  style={{ borderRadius: 8, padding: "12px 16px" }}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                  size="large"
                  style={{
                    height: 48,
                    borderRadius: 8,
                    fontWeight: 600,
                    backgroundColor: "#ff4d4f",
                    borderColor: "#ff4d4f",
                    fontSize: 16,
                    transition: "all 0.2s",
                  }}
                >
                  SIGN IN
                </Button>
              </Form.Item>

              <Divider
                style={{ margin: "16px 0", borderColor: "#f0f0f0" }}
              ></Divider>

              <Text
                style={{
                  color: "#595959",
                  fontSize: 14,
                }}
              >
                Forgot password? Contact IT Support
              </Text>
            </Form>
          </Space>
        </Card>
      </Content>
    </Layout>
  );
};

export default Login;
