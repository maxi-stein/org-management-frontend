import { Tooltip, Typography } from "antd";
import { Department, User } from "../interfaces/entities";
import { Badge } from "../components/Badge";
import { ExclamationCircleFilled } from "@ant-design/icons";

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
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
  ],
};
