export type BffEntity = Area | Department | Position | User;
export type BffEntityInput =
  | AreaInput
  | DepartmentInput
  | PositionInput
  | UserInput
  | RoleInput;
export type EntityType =
  | "areas"
  | "departments"
  | "positions"
  | "users"
  | "roles";

export interface AreaInput {
  name: string;
  departments: Department[];
}

export interface Area extends AreaInput {
  _id: string;
}

export interface DepartmentInput {
  name: string;
  description: string;
  head: User;
}

export interface Department extends DepartmentInput {
  _id: string;
}

export interface PositionInput {
  title: string;
  level: string | null;
}

export interface Position extends PositionInput {
  _id: string;
}

export interface RoleInput {
  name: string;
}

export interface Role extends RoleInput {
  _id: string;
}

export interface UserInput {
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  supervisedEmployees: User[];
  phone: string;
  bornDate: Date;
  isActive: boolean;
  position: Position | null;
}

export interface User extends UserInput {
  _id: string;
}
