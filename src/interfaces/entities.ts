export type BffEntity = Area | Department | Position | User;
export type BffEntityToEdit =
  | AreaToEdit
  | DepartmentToEdit
  | PositionToEdit
  | UserToEdit
  | RoleToEdit;
export type EntityType =
  | "areas"
  | "departments"
  | "positions"
  | "users"
  | "roles";

export interface AreaToEdit {
  name: string;
  departments: Department[];
}

export interface Area extends AreaToEdit {
  _id: string;
}

export interface DepartmentToEdit {
  name: string;
  description: string;
  head: User;
}

export interface Department extends DepartmentToEdit {
  _id: string;
}

export interface PositionToEdit {
  title: string;
  level: string | null;
}

export interface Position extends PositionToEdit {
  _id: string;
}

export interface RoleToEdit {
  name: string;
}

export interface Role extends RoleToEdit {
  _id: string;
}

export interface UserToEdit {
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

export interface User extends UserToEdit {
  _id: string;
}
