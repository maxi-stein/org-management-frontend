import { Form, Input, Select, Tooltip, Typography } from "antd";
import { useQuery } from "@tanstack/react-query";
import {
  getDepartments,
  getHeadOfDepartments,
} from "../apiServices/departmentsService";
import { Department, EntityType, User } from "../interfaces/entities";
import { AdditionalData, FormColumns } from "../interfaces/form";

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
  users: {},
  roles: {},
};

export const useItemsForm = (
  entityType: EntityType,
  editingId: string | null,
  additionalFormData: AdditionalData
) => {
  const { data: departments } = useQuery<{ data: Department[] }>({
    queryKey: ["fetch-departments"],
    queryFn: getDepartments,
    enabled: entityType === "areas",
  });

  const { data: headOfDepartments } = useQuery({
    queryKey: ["head-of-departments"],
    queryFn: () => getHeadOfDepartments(),
    enabled: entityType === "departments",
  });

  const renderFormItems = (columns: FormColumns[]) => {
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
        additionalFormData.areas
      ) {
        //get all departments that are asigned to an area
        const assignedDepartments = additionalFormData.areas.flatMap((area) =>
          area.departments.map((dept) => ({
            ...dept,
            assignedToAreaId: area._id,
          }))
        );

        //get current departments for the area being edited
        const currentAreaDepartments = editingId
          ? additionalFormData?.areas.find((area) => area._id === editingId)
              ?.departments || []
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
            return additionalFormData.departments?.every((dept) => {
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
  };

  return { renderFormItems };
};
