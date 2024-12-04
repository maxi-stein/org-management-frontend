import { FormInstance } from "antd";
import {
  Area,
  BffEntity,
  Department,
  EntityType,
} from "../interfaces/entities";

// Function to set dynamic form values
export const setFormValues = (
  form: FormInstance<any>,
  entityType: EntityType,
  entity: BffEntity
) => {
  // Check if the entity is of type Area
  if (entityType === "areas") {
    const area = entity as Area;
    // Set the departments in the form
    form.setFieldsValue({
      departments: area.departments.map((dept) => dept._id),
      name: area.name,
    });
  } else if (entityType === "departments") {
    const department = entity as Department;
    // Set the head in the form
    form.setFieldsValue({
      head: department.head?._id || null,
      name: department.name,
      description: department.description,
    });
  }
};

export const getDataForEntity = (entityType: EntityType, values: any) => {
  switch (entityType) {
    case "areas":
      return { name: values.name, departments: values.departments } as Area;
    case "departments":
      return {
        name: values.name,
        description: values.description,
        head: values.head,
      } as Department;
    default:
      return {} as any;
  }
};
