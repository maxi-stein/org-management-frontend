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

import { EntityType, User } from "../interfaces/entities";
import { FormColumns } from "../interfaces/form";

import { useDataContext } from "../contexts/dataContext";
import { useEffect, useState } from "react";

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
    password: [
      {
        required: true,
        message: "Please input a password!",
      },
      {
        min: 8,
        message: "Password must be at least 8 characters",
      },
      {
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/,
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, and one number",
      },
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
  const dataContext = useDataContext();
  const { data: departments, fetchDepartments } = dataContext.departments;
  const { data: areas, fetchAreas } = dataContext.areas;
  const { data: users, fetchUsers } = dataContext.users;
  const { data: positions, fetchPositions } = dataContext.positions;
  const { data: roles, fetchRoles } = dataContext.roles;
  const [headOfDepartments, setHeadOfDepartments] = useState<User[]>([]);

  //get departments only if departments or areas form is rendered
  if ((entityType === "departments" || "areas") && !departments) {
    fetchDepartments();
  }

  //get areas only if areas form is rendered
  if (entityType === "areas" && !areas) {
    fetchAreas();
  }

  //get users only if users form is rendered
  if ((entityType === "users" || "departments") && !users) {
    fetchUsers();
  }

  //get positions only if users form is rendered
  if (entityType === "users" && !positions) {
    fetchPositions();
  }

  //get roles only if users form is rendered
  if (entityType === "users" && !roles) {
    fetchRoles();
  }

  //uppon change on users, get new heads of departments
  useEffect(() => {
    if (departments) {
      const heads = users?.data.filter(
        (user) => user.position?.title === "Head Of Department"
      );
      setHeadOfDepartments(heads || []);
    }
  }, [users]);

  const renderFormItems = (columns: FormColumns[], isEditing?: boolean) => {
    if (entityType === "users") {
      //Filter employees that are beeing supervised + heads of departments
      const ceo = users?.data.find((user) => user.position?.title === "CEO");
      const heads = users?.data.filter(
        (user) => user.position?.title === "Head Of Department"
      );
      const ownSupervisedEmployees = users?.data.find(
        (emp) => emp._id == editingId
      )?.supervisedEmployees;
      const notAvailableEmployees = users?.data
        .flatMap((user) => {
          const usersNotAvailable = user.supervisedEmployees;
          if (heads) {
            return [...usersNotAvailable, ...heads, ceo!];
          } else {
            return usersNotAvailable;
          }
        })
        .filter((emp) => !ownSupervisedEmployees?.includes(emp));

      //Filter available employees
      const availableEmployees = users?.data.filter((user) => {
        return !notAvailableEmployees?.some((emp) => emp?._id == user._id);
      });
      return (
        <div>
          <Card
            title="User Info"
            style={{
              marginBottom: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
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
                <Input placeholder={"example@ex.com"} autoComplete="email" />
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
              label="Password"
              name="password"
              rules={isEditing ? [] : validationRules[entityType]["password"]}
              style={{ width: "100%" }}
            >
              <Input.Password
                placeholder="Enter password"
                disabled={isEditing}
                autoComplete="new-password"
              />
            </Form.Item>
            <Space size={"middle"}>
              <Form.Item
                key="positionLevel"
                name="positionLevel"
                label="Seniority"
                style={{ width: "130px" }}
              >
                <Select
                  placeholder="Select a Seniority Level"
                  options={[
                    { value: null, label: "No seniority" },
                    ...(dataContext.positionLevels.data?.data.map((level) => ({
                      value: level.value,
                      label: level.label,
                    })) || []),
                  ]}
                  defaultActiveFirstOption={true}
                />
              </Form.Item>
              <Form.Item
                key={"position"}
                name={"position"}
                label={"Position"}
                rules={validationRules[entityType]["position"]}
                style={{ width: "300px" }}
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
                  options={positions?.data
                    .filter(
                      (position) =>
                        !(ceo && isEditing && ceo._id === position._id)
                    )
                    .map((position) => ({
                      value: position._id,
                      label: position.title,
                    }))}
                />
              </Form.Item>
            </Space>
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
                  style={{ width: "100%" }}
                  placeholder="Search employees"
                  filterOption={(input, option) => {
                    if (option) {
                      return option.name
                        .toLowerCase()
                        .includes(input.toLowerCase());
                    }
                    return false;
                  }}
                  options={users?.data.map((user) => ({
                    value: user._id,
                    label: (
                      <Tooltip
                        title={
                          !availableEmployees?.some(
                            (emp) => emp._id === user._id
                          )
                            ? "This employee is already beeing supervised by another employee"
                            : ""
                        }
                      >
                        {user.firstName + " " + user.lastName}
                      </Tooltip>
                    ),
                    name: user.firstName + " " + user.lastName,
                    disabled: !availableEmployees?.some(
                      (emp) => emp._id === user._id
                    ),
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
              <Form.Item
                key="role"
                name="role"
                label="Role"
                rules={[{ required: true }]}
              >
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
                          {<Text style={{ color: "gray" }}>{dept.name}</Text>}
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
