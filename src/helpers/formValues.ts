import { FormInstance } from "antd";
import { Area, BffEntity, EntityType } from "../interfaces/entities";

// Function to set dynamic form values
export const setFormValues = (
  form: FormInstance<any>,
  entityType: EntityType,
  entity: BffEntity
) => {
  // Check if the entity is of type Area
  if (entityType === "areas" && (entity as Area).departments) {
    const area = entity as Area;
    // Set the departments in the form
    form.setFieldsValue({
      departments: area.departments.map((dept) => dept._id),
      name: area.name,
    });
  } else {
    form.setFieldsValue(entity); // TODO: set other fields
  }
};
