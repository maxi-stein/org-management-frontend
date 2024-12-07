import {
  Card,
  DatePicker,
  Form,
  Input,
  Select,
  Space,
  Switch,
  Tooltip,
  Typography,
} from "antd";
import { useQuery } from "@tanstack/react-query";
import {
  getDepartments,
  getHeadOfDepartments,
} from "../apiServices/departmentsService";
import {
  Area,
  Department,
  EntityType,
  Position,
  Role,
  User,
} from "../interfaces/entities";
import { FormColumns } from "../interfaces/form";
import { getPositions } from "../apiServices/positionsService";
import { getUsers } from "../apiServices/userService";
import { getAreas } from "../apiServices/areasService";
import { getRoles } from "../apiServices/rolesService";

const { Text } = Typography;

const validationRules: Record<string, Record<string, any[]>> = {
  departments: {
    name: [{ required: true, message: "Please input a department name." }],
    head: [{ required: false }],
    description: [
      {
        required: true,
        min: 10,
        message: "Description must be at least 10 characters long.",
      },
    ],
  },
  areas: {
    departments: [
      { required: true, message: "Please select at least one department!" },
    ],
  },
  positions: {},
  users: {
    firstName: [{ required: true, message: `Please input a First name!` }],
    lastName: [{ required: true, message: `Please input a Last name!` }],
    email: [
      { required: true, message: "Please input a valid email.", type: "email" },
    ],
    position: [{ required: true, message: "Please select a position!" }],
    supervisedEmployees: [{ required: false }],
    prefix: [{ required: true, message: "Please select a prefix" }],
    phone: [
      { required: true, message: "Please enter a phone number" },
      {
        pattern: /^[\d\s-]*$/,
        message: "Invalid phone number",
      },
    ],
    bornDate: [
      {
        required: true,
        message: "Enter a birth date",
      },
    ],
    role: [{ required: true, message: "Please select a role!" }],
  },
};

export const useItemsForm = (
  entityType: EntityType,
  editingId: string | null
) => {
  const { data: departments } = useQuery<{ data: Department[] }>({
    queryKey: ["fetch-departments"],
    queryFn: getDepartments,
    enabled: entityType === "areas" || entityType === "departments",
  });

  const { data: areas } = useQuery<{ data: Area[] }>({
    queryKey: ["fetch-areas"],
    queryFn: getAreas,
    enabled: entityType === "areas",
  });

  const { data: headOfDepartments } = useQuery<User[]>({
    queryKey: ["head-of-departments"],
    queryFn: () => getHeadOfDepartments(),
    enabled: entityType === "departments",
  });

  const { data: positions } = useQuery<{ data: Position[] }>({
    queryKey: ["fetch-positions"],
    queryFn: getPositions,
    enabled: entityType === "users",
  });

  const { data: users } = useQuery<{ data: User[] }>({
    queryKey: ["fetch-users"],
    queryFn: getUsers,
    enabled: entityType === "users",
  });

  const { data: roles } = useQuery<{ data: Role[] }>({
    queryKey: ["fetch-roles"],
    queryFn: getRoles,
    enabled: entityType === "users",
  });

  const renderFormItems = (columns: FormColumns[]) => {
    if (entityType === "users") {
      //Filter employees that are beeing supervised + heads of departments
      const heads = users?.data.filter(
        (user) => user.position?.title === "Head of Department"
      );
      const notAvailableEmployees = users?.data.flatMap((user) => {
        const usersNotAvailable = user.supervisedEmployees;
        if (heads) {
          return [...usersNotAvailable, ...heads];
        } else {
          return usersNotAvailable;
        }
      });

      //Filter available employees
      const availableEmployees = users?.data.filter((user) => {
        return !notAvailableEmployees?.some((emp) => emp._id == user._id);
      });
      return (
        <div>
          <Card title="User Info" style={{ marginBottom: 20 }}>
            <Space
              size={"middle"}
              style={{ display: "flex", flexDirection: "row" }}
            >
              <Form.Item
                key={"firstName"}
                name={"firstName"}
                label={"First name"}
                rules={validationRules[entityType]["firstName"] || [,]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                key={"lastName"}
                name={"lastName"}
                label={"Last name"}
                rules={
                  validationRules[entityType]["lastName"] || [
                    { required: true, message: `Please input lastName!` },
                  ]
                }
              >
                <Input />
              </Form.Item>
            </Space>
            <Space size={"middle"}>
              <Form.Item
                key={"email"}
                name={"email"}
                label={"Email"}
                rules={validationRules[entityType]["email"]}
              >
                <Input placeholder={"example@ex.com"} />
              </Form.Item>
              <Form.Item
                key="phone"
                name="phone"
                label="Phone Number"
                style={{ width: "184px" }}
                rules={validationRules[entityType]["phone"]}
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder="Enter a phone number"
                />
              </Form.Item>
            </Space>
            <Form.Item
              key={"position"}
              name={"position"}
              label={"Position"}
              rules={validationRules[entityType]["position"]}
              style={{ width: "90%" }}
            >
              <Select
                showSearch
                placeholder="Select a position"
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={positions?.data.map((position) => ({
                  value: position._id,
                  label: position.level
                    ? position.level + " " + position.title
                    : position.title,
                }))}
              />
            </Form.Item>
            <Space size={"middle"}>
              <Form.Item
                key={"supervisedEmployees"}
                name={"supervisedEmployees"}
                label={"Employees supervising"}
                rules={validationRules[entityType]["supervisedEmployees"]}
                style={{ width: "220px" }}
              >
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Search employees"
                  filterOption={(input, option) => {
                    if (option) {
                      return option.label
                        .toLowerCase()
                        .includes(input.toLowerCase());
                    }
                    return false;
                  }}
                  options={availableEmployees?.map((user) => ({
                    value: user._id,
                    label: user.firstName + " " + user.lastName,
                  }))}
                />
              </Form.Item>
              <Form.Item
                key="bornDate"
                label="Birth Date"
                name="bornDate"
                rules={validationRules[entityType]["bornDate"]}
              >
                <DatePicker format="DD/MM/YYYY" />
              </Form.Item>
            </Space>
          </Card>
          <Card
            title="Account details"
            style={{
              marginBottom: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Space size={"middle"}>
              <Form.Item label="Active" name={"isActive"} key={"isActive"}>
                <Switch defaultChecked={true} />
              </Form.Item>
              <Form.Item key="role" name="role" label="Role">
                <Select
                  placeholder="Select a role"
                  options={roles?.data.map((role) => ({
                    value: role._id,
                    label: role.name,
                  }))}
                />
              </Form.Item>
            </Space>
          </Card>
        </div>
      );
    } else {
      return columns.map((column) => {
        if (column.dataIndex === "description") {
          return (
            <Form.Item
              key={column.dataIndex}
              name={column.dataIndex}
              label={column.title}
              rules={validationRules[entityType][column.dataIndex]}
            >
              <Input.TextArea style={{ height: "100px" }} />
            </Form.Item>
          );
        }
        if (
          entityType === "areas" &&
          column.dataIndex === "departments" &&
          areas
        ) {
          //get all departments that are asigned to an area
          const assignedDepartments = areas.data.flatMap((area) =>
            area.departments.map((dept) => ({
              ...dept,
              assignedToAreaId: area._id,
            }))
          );

          //get current departments for the area being edited
          const currentAreaDepartments = editingId
            ? areas?.data.find((area) => area._id === editingId)?.departments ||
              []
            : [];

          return (
            <Form.Item
              key={column.dataIndex}
              name={column.dataIndex}
              label={column.title}
              rules={validationRules[entityType][column.dataIndex]}
            >
              <Select
                mode="multiple"
                placeholder="Select departments"
                style={{ width: "100%" }}
              >
                {departments?.data.map((dept) => {
                  //check if the department is already assigned to another area
                  const isAssigned = assignedDepartments?.some(
                    (assignedDept) =>
                      assignedDept._id === dept._id &&
                      assignedDept.assignedToAreaId !== editingId
                  );
                  //check if the department is already assigned to the area being edited
                  const isCurrentAreaDepartment = currentAreaDepartments.some(
                    (currentDept) => currentDept._id === dept._id
                  );

                  return (
                    <Select.Option
                      key={dept._id}
                      value={dept._id}
                      disabled={isAssigned && !isCurrentAreaDepartment}
                    >
                      {isAssigned && !isCurrentAreaDepartment ? (
                        <Tooltip title="This department is already assigned to another area.">
                          {<Text>{dept.name}</Text>}
                        </Tooltip>
                      ) : (
                        <Text>{dept.name}</Text>
                      )}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          );
        }
        if (entityType === "departments" && column.dataIndex === "head") {
          //gets head of departments without a department asigned
          let availableHeads =
            headOfDepartments?.filter((user) => {
              return departments?.data.every((dept) => {
                return user._id !== dept.head?._id;
              });
            }) ?? [];

          availableHeads = [
            { _id: null, firstName: "", lastName: "--none--" } as User,
            ...(availableHeads as User[]),
          ];

          const allHeadOfDepartments = [
            { _id: null, firstName: "", lastName: "--none--" },
          ] as User[];

          if (headOfDepartments) {
            allHeadOfDepartments.push(...(headOfDepartments as User[]));
          }

          return (
            <Form.Item
              key={column.dataIndex}
              name={column.dataIndex}
              label={column.title}
              rules={validationRules[entityType][column.dataIndex]}
            >
              <Select
                placeholder="Select the head of department"
                style={{ width: "100%" }}
              >
                {allHeadOfDepartments?.map((user) => {
                  const isAvailable = availableHeads?.some(
                    (head) => head._id === user._id
                  );
                  return (
                    <Select.Option
                      key={user._id}
                      value={user._id}
                      disabled={!isAvailable}
                    >
                      {!isAvailable ? (
                        <Tooltip title="This head is already assigned to another department.">
                          <Text
                            style={{ color: "gray" }}
                          >{`${user.lastName}, ${user.firstName}`}</Text>
                        </Tooltip>
                      ) : user._id ? (
                        <Text>{`${user.lastName}, ${user.firstName}`}</Text>
                      ) : (
                        <Text>{user.lastName}</Text>
                      )}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          );
        }
        return (
          <Form.Item
            key={column.dataIndex}
            name={column.dataIndex}
            label={column.title}
            rules={
              validationRules[entityType][column.dataIndex] || [
                { required: true, message: `Please input ${column.title}!` },
              ]
            }
          >
            <Input />
          </Form.Item>
        );
      });
    }
  };

  return { renderFormItems };
};
