import { FormInstance } from "antd";
import dayjs from "dayjs";
import {
  Area,
  BffEntity,
  BffEntityInput,
  Department,
  EntityType,
  Position,
  User,
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
    });
  },
  users: (form: FormInstance<any>, entity: BffEntity) => {
    const user = entity as User;
    form.setFieldsValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      phone: user.phone,
      position: user.position?._id,
      positionLevel: user.positionLevel,
      supervisedEmployees: user.supervisedEmployees.map((emp) => emp._id),
      bornDate: dayjs(user.bornDate),
      isActive: user.isActive,
      role: user.role._id,
    });
  },
  roles: (form: FormInstance<any>, entity: BffEntity) => {},
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
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    password: values.password,
    phone: values.phone,
    position: values.position,
    supervisedEmployees: values.supervisedEmployees,
    bornDate: dayjs(values.bornDate),
    isActive: values.isActive,
    role: values.role,
  }),
  roles: (values: any) => ({}),
};

//Generic function to get data for entity
export const getDataForEntity = (entityType: EntityType, values: any) => {
  const dataBuilder = entityDataBuilders[entityType];
  return dataBuilder
    ? (dataBuilder(values) as BffEntityInput)
    : ({} as BffEntityInput);
};
