import { Area, Department, Position, User } from "./entities";

export type FormColumns = {
  title: string;
  dataIndex: string;
  key: string;
};

export type AdditionalData = {
  areas?: Area[];
  departments?: Department[];
  positions?: Position[];
  users?: User[];
};
