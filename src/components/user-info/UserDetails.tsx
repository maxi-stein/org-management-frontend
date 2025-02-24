import {
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { Card, Typography } from "antd";
import { User } from "../../interfaces/entities";
import { IconContainer } from "./styled";

interface Props {
  user: User;
}

export const UserDetails = ({ user }: Props) => {
  const { Text } = Typography;

  const DetailItem = ({
    icon,
    label,
    value,
    copyable = false,
  }: {
    icon: React.ReactNode;
    label: string;
    value: string;
    copyable?: boolean;
  }) => (
    <div
      style={{
        padding: "16px",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "8px",
        }}
      >
        <IconContainer>{icon}</IconContainer>
        <Text
          strong
          style={{
            color: "#595959",
            fontSize: "13px",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          {label}
        </Text>
      </div>

      {copyable ? (
        <Text
          copyable={{
            icon: <CopyOutlined style={{ color: "red" }} />,
          }}
          style={{
            color: "#262626",
            fontSize: "14px",
            marginLeft: "44px",
          }}
        >
          {value}
        </Text>
      ) : (
        <Text
          strong
          style={{
            color: "#262626",
            fontSize: "16px",
            marginLeft: "44px",
          }}
        >
          {value}
        </Text>
      )}
    </div>
  );

  const iconStyle = { color: "#ff4d4f", fontSize: "20px" };

  return (
    <Card
      style={{
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <DetailItem
        icon={<MailOutlined style={iconStyle} />}
        label="Email Address"
        value={user.email}
        copyable
      />

      <DetailItem
        icon={<PhoneOutlined style={iconStyle} />}
        label="Phone Number"
        value={user.phone}
      />

      <DetailItem
        icon={<CalendarOutlined style={iconStyle} />}
        label="Birth Date"
        value={new Date(user.bornDate).toLocaleDateString()}
      />
    </Card>
  );
};
