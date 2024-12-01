import { Area } from "./entities";

export type FormColumns = {
  title: string;
  dataIndex: string;
  key: string;
};

export type AdditionalData = {
  areas: Area[];
  [key: string]: any; // For other entity types
};
