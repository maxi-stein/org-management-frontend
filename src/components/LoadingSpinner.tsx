import { Spin, Typography, Space } from "antd";

const { Text } = Typography;

interface SpinnerProps {
  isLoading: boolean;
  message?: string;
  size?: "default" | "large" | "small";
}

const LoadingSpinner = ({
  isLoading = false,
  message = "Loading...",
  size = "default",
}: SpinnerProps) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <Space
        direction="vertical"
        size="middle"
        style={{ textAlign: "center", color: "white" }}
      >
        <Spin size={size} />
        <Text>{message}</Text>
      </Space>
    </div>
  );
};

export default LoadingSpinner;
