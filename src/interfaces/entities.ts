export type BffEntity = Area | Department | Position | User;

export interface Area {
  _id: string;
  name: string;
  departments: Department[];
}

export interface Department {
  _id: string;
  name: string;
  description: string;
  head: User;
}

export interface Position {
  _id: string;
  title: string;
  level: string | null;
}

export interface Role {
  _id: string;
  name: string;
}

export interface User {
  _id: string;
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
