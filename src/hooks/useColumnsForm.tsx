import { Tooltip, Typography } from "antd";
import { Department, Position, Role, User } from "../interfaces/entities";
import { Badge } from "../components/Badge";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";

const { Text } = Typography;

const renderDepartments = (departments: Department[]) => {
  return departments.map((dept) => (
    <Tooltip key={dept._id} title={dept.description}>
      <span>
        <Badge key={dept._id} text={dept.name} status="active" />
      </span>
    </Tooltip>
  ));
};

const renderSupervisedEmployees = (employees: User[]) =>
  employees.map((emp) => (
    <Badge
      key={emp._id}
      text={`${emp.firstName} ${emp.lastName}`}
      status="active"
    />
  ));

export const getColumnsForm = {
  areas: [
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Departments",
      dataIndex: "departments",
      key: "departments",
      render: (departments: Department[]) => renderDepartments(departments),
    },
  ],
  departments: [
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Head of Department",
      dataIndex: "head",
      key: "head",
      render: (head: User | null) =>
        head ? (
          <Text>{`${head.lastName}, ${head.firstName}`}</Text>
        ) : (
          <Text style={{ color: "#d9534f" }}>
            <ExclamationCircleFilled /> No Head of Department Assigned
          </Text>
        ),
    },
    { title: "Description", dataIndex: "description", key: "description" },
  ],
  positions: [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Level", dataIndex: "level", key: "level" },
  ],
  users: [
    { title: "First Name", dataIndex: "firstName", key: "firstName" },
    { title: "Last Name", dataIndex: "lastName", key: "lastName" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      width: 150,
      render: (position: Position) => (
        <Text>
          {position?.level} {position?.title}
        </Text>
      ),
    },
    {
      title: "Supervised Employees",
      dataIndex: "supervisedEmployees",
      key: "supervisedEmployees",
      render: (employees: User[]) => renderSupervisedEmployees(employees),
    },
    { title: "Phone Number", dataIndex: "phone", key: "phone" },
    {
      title: "Birth Date",
      dataIndex: "bornDate",
      key: "bornDate",
      render: (date: Date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (value: boolean) =>
        value ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CheckCircleOutlined style={{ color: "green" }} />
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CloseCircleOutlined style={{ color: "red" }} />
          </div>
        ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: Role) => <Text>{role.name}</Text>,
    },
  ],
};
