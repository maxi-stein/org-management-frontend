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
import { CompanyLogo } from "../components/CompanyLogo";

const { Title, Text } = Typography;
const { Content } = Layout;

const Login: React.FC = () => {
  const { user, login, isLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !isLoading) {
      navigate("/");
    }
  }, [user, isLoading, navigate]);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/auth", {
        email: values.email,
        password: values.password,
      });

      await login(data.token, data.user);
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
        background:
          "linear-gradient(135deg, #3185fc 0%,rgb(157, 182, 223) 100%)",
      }}
    >
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          style={{
            width: "100%",
            maxWidth: 420,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            borderRadius: 12,
          }}
        >
          <Space
            direction="vertical"
            size="middle"
            style={{ textAlign: "center", width: "100%" }}
          >
            <CompanyLogo />
            <Title level={3} style={{ marginBottom: 0 }}>
              Welcome to the Organizational Chart viewer
            </Title>
            <Text type="secondary" style={{ marginBottom: 32 }}>
              Please sign in to continue
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
                  prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="Email"
                  size="large"
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
                  prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="Password"
                  size="large"
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
                    height: 45,
                    fontWeight: 600,
                    backgroundColor: "#f6f930",
                    color: "black",
                  }}
                >
                  SIGN IN
                </Button>
              </Form.Item>

              <Divider style={{ margin: "16px 0" }}></Divider>

              <Text type="secondary" style={{ fontSize: 14 }}>
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
