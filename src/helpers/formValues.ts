import { FormInstance } from "antd";
import {
  Area,
  BffEntity,
  BffEntityInput,
  Department,
  EntityType,
  Position,
} from "../interfaces/entities";

// Function to set dynamic form values
const entitySetters = {
  areas: (form: FormInstance<any>, entity: BffEntity) => {
    const area = entity as Area;
    form.setFieldsValue({
      departments: area.departments.map((dept) => dept._id),
      name: area.name,
    });
  },
  departments: (form: FormInstance<any>, entity: BffEntity) => {
    const department = entity as Department;
    form.setFieldsValue({
      head: department.head?._id || null,
      name: department.name,
      description: department.description,
    });
  },
  positions: (form: FormInstance<any>, entity: BffEntity) => {
    const position = entity as Position;
    form.setFieldsValue({
      title: position.title,
      level: position.level,
    });
  },
  users: (form: FormInstance<any>, entity: BffEntity) => {
    //TODO: users
  },
  roles: (form: FormInstance<any>, entity: BffEntity) => {
    //TODO: roles
  },
};

export const setFormValues = (
  form: FormInstance<any>,
  entityType: EntityType,
  entity: BffEntity
) => {
  const setter = entitySetters[entityType];
  if (setter) {
    setter(form, entity);
  }
};

const entityDataBuilders = {
  areas: (values: any) => ({
    name: values.name,
    departments: values.departments,
  }),
  departments: (values: any) => ({
    name: values.name,
    description: values.description,
    head: values.head,
  }),
  positions: (values: any) => ({
    title: values.title,
    level: values.level,
  }),
  users: (values: any) => ({
    //TODO: users
  }),
  roles: (values: any) => ({
    //TODO: roles
  }),
};

// Función genérica para obtener los datos de la entidad
export const getDataForEntity = (entityType: EntityType, values: any) => {
  const dataBuilder = entityDataBuilders[entityType];
  return dataBuilder
    ? (dataBuilder(values) as BffEntityInput)
    : ({} as BffEntityInput);
};
