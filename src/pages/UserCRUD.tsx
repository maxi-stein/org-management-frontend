import React from "react";
import GenericCRUD from "../components/GenericCRUD";
import { Position, Role, User } from "../interfaces/entities";
import { Typography } from "antd";
import { Badge } from "../components/Badge";

const { Text } = Typography;

const renderSupervisedEmployees = (employees: User[]) =>
  employees.map((emp) => (
    <Badge
      key={emp._id}
      text={`${emp.firstName} ${emp.lastName}`}
      status="active"
    />
  ));
const columns = [
  { title: "First Name", dataIndex: "firstName", key: "firstName" },
  { title: "Last Name", dataIndex: "lastName", key: "lastName" },
  { title: "Email", dataIndex: "email", key: "email" },
  {
    title: "Position",
    dataIndex: "position",
    key: "position",
    render: (position: Position) => (
      <Text>
        {position.level} {position.title}
      </Text>
    ),
  },
  {
    title: "Supervised Employees",
    dataIndex: "supervisedEmployees",
    key: "supervisedEmployees",
    render: (employees: User[]) => renderSupervisedEmployees(employees),
  },
  { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
  { title: "Birth Date", dataIndex: "bornDate", key: "bornDate" },
  { title: "Active", dataIndex: "isActive", key: "isActive" },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    render: (role: Role) => <Text>{role.name}</Text>,
  },
];

const UserCRUD: React.FC = () => {
  return <GenericCRUD title="Users" items={initialUsers} columns={columns} />;
};

export default UserCRUD;
