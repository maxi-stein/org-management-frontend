import { Card, Flex, Typography } from "antd";
import { User } from "../../interfaces/entities";
import { MailOutlined } from "@ant-design/icons";

interface Props {
  employees: User[];
}

export const SupervisedEmployees = ({ employees }: Props) => {
  const { Text, Title } = Typography;

  return (
    <Card
      title={
        <Title level={5} style={{ color: "#ff4d4f", margin: 0 }}>
          SUPERVISED EMPLOYEES
        </Title>
      }
      style={{
        borderRadius: 12,
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <Flex gap={16} wrap="wrap">
        {employees.length > 0 ? (
          employees.map((employee, index) => (
            <div
              key={index}
              style={{
                width: "calc(25% - 12px)",
                minWidth: 250,
                padding: 16,
                borderRadius: 8,
                border: "1px solid red",
                transition: "all 0.2s",
              }}
            >
              <Title
                level={5}
                style={{
                  color: "#262626",
                  marginBottom: 4,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span>{`${employee.firstName} ${employee.lastName}`}</span>
              </Title>

              <Text
                type="secondary"
                style={{
                  display: "block",
                  fontSize: 13,
                  marginBottom: 8,
                  color: "#595959",
                }}
              >
                {`${employee.positionLevel || ""} ${employee.position?.title}`}
              </Text>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: "#ff4d4f",
                }}
              >
                <MailOutlined style={{ fontSize: 14 }} />
                <a
                  href={`mailto:${employee.email}`}
                  style={{
                    color: "inherit",
                  }}
                >
                  {employee.email}
                </a>
              </div>
            </div>
          ))
        ) : (
          <div
            style={{
              width: "100%",
              textAlign: "center",
              padding: 24,
              color: "#8c8c8c",
            }}
          >
            <Text>No supervised employees</Text>
          </div>
        )}
      </Flex>
    </Card>
  );
};
