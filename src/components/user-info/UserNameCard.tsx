import { Avatar, Badge, Flex, Typography } from "antd";
import { User } from "../../interfaces/entities";
import {
  CrownOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";

interface Props {
  user: User;
}

export const UserNameCard = ({ user }: Props) => {
  const { Text } = Typography;
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #ff4d4f 0%, #cf1322 100%)",
        borderRadius: 12,
        height: "100%",
        padding: 16,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        transition: "all 0.3s",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <Flex align="center" gap={16}>
        <Badge
          count={<CrownOutlined style={{ color: "#ffffff" }} />}
          offset={[-12, 40]}
          style={{
            filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
          }}
        >
          <Avatar
            size={64}
            style={{
              backgroundColor: "#ffffff",
              color: "#ff4d4f",
              fontWeight: 700,
              fontSize: 20,
              border: "2px solid #1a1a1a",
            }}
          >
            {user.firstName[0] + user.lastName[0]}
          </Avatar>
        </Badge>

        <Typography.Title
          level={3}
          style={{
            color: "#fff",
            margin: 0,
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <UserOutlined style={{ marginRight: 8, color: "#ffffff" }} />
          {`${user.firstName} ${user.lastName}`}
        </Typography.Title>
      </Flex>

      <div
        style={{
          backgroundColor: "rgba(26, 26, 26, 0.7)",
          borderRadius: 8,
          padding: "8px 12px",
          backdropFilter: "blur(4px)",
          marginTop: 12,
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Text
          strong
          style={{
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            fontSize: 14,
          }}
        >
          <span
            style={{
              display: "inline-block",
              maxWidth: "90%",
              whiteSpace: "nowrap",
            }}
          >
            {`${user.positionLevel || ""} ${user.position?.title}`}
          </span>
        </Text>
      </div>
    </div>
  );
};
