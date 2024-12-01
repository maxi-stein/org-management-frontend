import { Form, Input, Select, Tooltip } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getDepartments } from "../apiServices/departmentsService";
import { Department, EntityType } from "../interfaces/entities";
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
        //get all departments that are asigned to an area
        const assignedDepartments = additionalData.areas.flatMap((area) =>
          area.departments.map((dept) => ({
            ...dept,
            assignedToAreaId: area._id,
          }))
        );

        //get current departments for the area being edited
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
                //check if the department is already assigned to another area
                const isAssigned = assignedDepartments.some(
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
                        {<span>{dept.name}</span>}
                      </Tooltip>
                    ) : (
                      <div>{dept.name}</div>
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
          rules={[{ required: true, message: `Please input ${column.title}!` }]}
        >
          <Input />
        </Form.Item>
      );
    });
  };

  return { renderFormItems };
};
