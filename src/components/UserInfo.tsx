import { Avatar, Card, Col, Divider, Row, Typography } from "antd";
import { getUser } from "../apiServices/userService";
import { User } from "../interfaces/entities";
import { useQuery } from "@tanstack/react-query";

interface Props {
  displayUser: User;
}

const { Text, Title } = Typography;

export const UserInfo = ({ displayUser }: Props) => {
  const {
    data: employees = [],
    isError, //TODO: handle Error
    isLoading, //TODO: handle loading
  } = useQuery({
    queryKey: ["supervised-employees", displayUser?._id],
    queryFn: async () => {
      const employeesData = await Promise.all(
        displayUser.supervisedEmployees.map(async (employee) => {
          const response = await getUser(employee._id!);
          return response.data[0];
        })
      );
      return employeesData;
    },
    staleTime: 1000 * 60 * 60 * 4, //stale for 4hours
  });

  return (
    <Row gutter={[16, 16]}>
      <Col span={6}>
        <Card
          style={{
            backgroundColor: "#3185fc",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Row gutter={16}>
            <Col>
              <Avatar size={64}>
                {displayUser.firstName[0] + displayUser.lastName[0]}
              </Avatar>
            </Col>
            <Col>
              <Title
                level={4}
              >{`${displayUser.firstName} ${displayUser.lastName}`}</Title>
              <Text type="secondary" style={{ color: "white" }}>{`${
                displayUser.positionLevel || ""
              } ${displayUser.position?.title}`}</Text>
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span={18}>
        <Card title="User Details">
          <Row gutter={[16, 16]}>
            <Col span={8} style={{ display: "flex", justifyContent: "center" }}>
              <Text>
                <strong>Email: </strong>
              </Text>
              <Text>{displayUser.email}</Text>
            </Col>
            <Col span={8} style={{ display: "flex", justifyContent: "center" }}>
              <Text>
                <strong>Telephone Number: </strong>
              </Text>
              <Text>{displayUser.phone}</Text>
            </Col>
            <Col span={8} style={{ display: "flex", justifyContent: "center" }}>
              <Text>
                <strong>Birth Date: </strong>
              </Text>
              <Text>{new Date(displayUser.bornDate).toLocaleDateString()}</Text>
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span={24}>
        <Card title="Supervised Employees">
          <Row gutter={[48, 16]}>
            {employees.length > 0 ? (
              employees.map((employee, index) => (
                <Col
                  span={6}
                  key={index}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Text>
                    <strong>{`${employee.firstName} ${employee.lastName}`}</strong>
                  </Text>
                  <Text type="secondary">{`${employee.positionLevel || ""} ${
                    employee.position?.title
                  }`}</Text>
                  <a
                    href={`mailto:${employee.email}`}
                    title={`Send email to ${employee.email}`}
                  >
                    {employee.email}
                  </a>
                  <Divider />
                </Col>
              ))
            ) : (
              <Col span={24}>
                <Text>User is not supervising any employees</Text>
              </Col>
            )}
          </Row>
        </Card>
      </Col>
    </Row>
  );
};
