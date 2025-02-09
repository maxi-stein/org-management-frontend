import { Card, Row, Col, Typography, Avatar, Divider } from "antd";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { getUser } from "../apiServices/userService";
import { useQuery } from "@tanstack/react-query";

const { Title, Text } = Typography;

export const Dashboard = () => {
  const navigate = useNavigate();
  const { fullUser } = useAuth();

  if (!fullUser) {
    navigate("/login");
    return null;
  }

  const {
    data: employees = [],
    isError, //TODO: handle Error
    isLoading, //TODO: handle loading
  } = useQuery({
    queryKey: ["supervised-employees", fullUser?._id],
    queryFn: async () => {
      const employeesData = await Promise.all(
        fullUser.supervisedEmployees.map(async (employee) => {
          const response = await getUser(employee._id!);
          return response.data[0];
        })
      );
      return employeesData;
    },
    staleTime: 1000 * 60 * 60 * 4, //stale for 4hours
  });

  return (
    <div style={{ padding: "24px" }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Row align="middle" gutter={16}>
              <Col>
                <Avatar
                  size={64}
                  src={`https://ui-avatars.com/api/?name=${fullUser.firstName}+${fullUser.lastName}`}
                />
              </Col>
              <Col>
                <Title
                  level={4}
                >{`${fullUser.firstName} ${fullUser.lastName}`}</Title>
                <Text type="secondary">{`${fullUser.positionLevel || ""} ${
                  fullUser.position?.title
                }`}</Text>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="User Details">
            <Row gutter={[16, 24]}>
              <Col span={12}>
                <Text>
                  <strong>Email: </strong>
                </Text>
                <Text>{fullUser.email}</Text>
              </Col>
              <Col span={12}>
                <Text>
                  <strong>Telephone Number: </strong>
                </Text>
                <Text>{fullUser.phone}</Text>
              </Col>
              <Col span={12}>
                <Text>
                  <strong>Birth Date: </strong>
                </Text>
                <Text>{new Date(fullUser.bornDate).toLocaleDateString()}</Text>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Supervised Employees">
            <Row gutter={[48, 16]}>
              {employees.length > 0 ? (
                employees.map((employee, index) => (
                  <Col
                    span={12}
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
    </div>
  );
};
