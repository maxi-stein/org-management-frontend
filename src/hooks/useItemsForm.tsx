import { Form, Input, Select } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getDepartments } from "../apiServices/departments/departmentsService";
import {
  Area,
  BffEntity,
  Department,
  EntityType,
} from "../interfaces/entities";
import { AdditionalData, FormColumns } from "../interfaces/form";

export const useItemsForm = (
  entityType: EntityType,
  editingId: string | null,
  additionalData: AdditionalData
) => {
  const { data: departments } = useQuery<{ data: Department[] }>({
    queryKey: ["fetch-departments"],
    queryFn: getDepartments,
    enabled: entityType === "areas",
  });

  const renderFormItems = (columns: FormColumns[]) => {
    return columns.map((column) => {
      if (entityType === "areas" && column.dataIndex === "departments") {
        const assignedDepartments = additionalData.areas.flatMap((area) =>
          area.departments.map((dept) => ({
            ...dept,
            assignedToAreaId: area._id,
          }))
        );

        const currentAreaDepartments = editingId
          ? additionalData.areas.find((area) => area._id === editingId)
              ?.departments || []
          : [];

        return (
          <Form.Item
            key={column.dataIndex}
            name={column.dataIndex}
            label={column.title}
            rules={[
              {
                required: true,
                message: `Please select at least one department!`,
              },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Select departments"
              style={{ width: "100%" }}
            >
              {departments?.data.map((dept) => {
                const isAssigned = assignedDepartments.some(
                  (assignedDept) =>
                    assignedDept._id === dept._id &&
                    assignedDept.assignedToAreaId !== editingId
                );
                const isCurrentAreaDepartment = currentAreaDepartments.some(
                  (currentDept) => currentDept._id === dept._id
                );

                return (
                  <Select.Option
                    key={dept._id}
                    value={dept._id}
                    disabled={isAssigned && !isCurrentAreaDepartment}
                  >
                    {dept.name}
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
          rules={[{ required: true, message: `Please input ${column.title}!` }]}
        >
          <Input />
        </Form.Item>
      );
    });
  };

  return { renderFormItems };
};
