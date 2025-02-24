import { Avatar, Badge, Flex, Typography } from "antd";
import { User } from "../../interfaces/entities";
import {
  CrownOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { UserNameCardContainerStyled } from "./styled";

interface Props {
  user: User;
}

export const UserNameCard = ({ user }: Props) => {
  const { Text } = Typography;
  return (
    <UserNameCardContainerStyled>
      <Flex align="center" gap={16}>
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

        <Typography.Title
          level={3}
          style={{
            color: "#fff",
            margin: 0, // remove default margin
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            whiteSpace: "nowrap",
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
          }}
        >
          <span
            style={{
              whiteSpace: "nowrap",
            }}
          >
            {`${user.positionLevel || ""} ${user.position?.title}`}
          </span>
        </Text>
      </div>
    </UserNameCardContainerStyled>
  );
};
