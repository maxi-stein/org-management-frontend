import axios from "axios";
import { BffEntity, PositionLevel } from "../interfaces/entities";

export interface bffResponse<T extends BffEntity[]> {
  data: T;
  success: boolean;
}

export interface BffStatsResponse {
  data: [{ label: string; count: number }];
  success: boolean;
}

export interface PositionLevelsResponse {
  data: PositionLevel[];
  success: boolean;
}

const axiosInstance = axios.create({
  baseURL: `http://${import.meta.env.VITE_APP_HOST}:${
    import.meta.env.VITE_APP_PORT
  }`,
});

// Injecting token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { axiosInstance };
