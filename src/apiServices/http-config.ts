import axios from "axios";
import { BffEntity } from "../interfaces/entities";

const env = import.meta.env;

export const axiosInstance = axios.create({
  baseURL: `http://${env.VITE_APP_HOST}:${env.VITE_APP_PORT}`,
  headers: {
    Authorization: `${env.VITE_JWT_AUTH_TOKEN_TYPE} ${env.VITE_JWT_AUTH_TOKEN}`,
  },
});

export interface bffResponse<T extends BffEntity[]> {
  data: T;
}
