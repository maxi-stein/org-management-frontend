import {
  Card,
  Row,
  Col,
  Typography,
  Avatar,
  Divider,
  AutoComplete,
  Input,
} from "antd";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { getUser } from "../apiServices/userService";
import { useQuery } from "@tanstack/react-query";
import { SearchOutlined } from "@ant-design/icons";
import { useSearchUsers } from "../hooks/useSearchUsers";
import { User } from "../interfaces/entities";

const { Title, Text } = Typography;

interface Props {
  overrideUser?: User;
}

export const Dashboard = ({ overrideUser }: Props) => {
  const navigate = useNavigate();
  const { fullUser } = useAuth();
  const { searchOptions, setSearchQuery } = useSearchUsers();
  const displayUser = overrideUser || fullUser;

  console.log("El user es", displayUser?._id);
  if (displayUser === null) {
    console.log("navegando a login");
    navigate("/login");
    return null;
  }

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
    <div>
      <Row gutter={[16, 16]}>
        <Col span={18}>
          <Card>
            <Row align="middle" gutter={16}>
              <Col>
                <Avatar
                  size={64}
                  src={`https://ui-avatars.com/api/?name=${displayUser.firstName}+${displayUser.lastName}`}
                />
              </Col>
              <Col>
                <Title
                  level={4}
                >{`${displayUser.firstName} ${displayUser.lastName}`}</Title>
                <Text type="secondary">{`${displayUser.positionLevel || ""} ${
                  displayUser.position?.title
                }`}</Text>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={6}>
          <Card
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Text>Search for an employee</Text>
            <AutoComplete
              options={searchOptions}
              onSearch={(value) => setSearchQuery(value)}
              onSelect={(_, option) => option.label.props.onClick()}
              style={{ width: "100%" }}
            >
              <Input prefix={<SearchOutlined />} />
            </AutoComplete>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="User Details">
            <Row gutter={[16, 24]}>
              <Col span={12}>
                <Text>
                  <strong>Email: </strong>
                </Text>
                <Text>{displayUser.email}</Text>
              </Col>
              <Col span={12}>
                <Text>
                  <strong>Telephone Number: </strong>
                </Text>
                <Text>{displayUser.phone}</Text>
              </Col>
              <Col span={12}>
                <Text>
                  <strong>Birth Date: </strong>
                </Text>
                <Text>
                  {new Date(displayUser.bornDate).toLocaleDateString()}
                </Text>
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
