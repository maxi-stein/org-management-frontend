import { Department } from "../interfaces/entities";
import { axiosInstance, bffResponse } from "./http-config";

export const getDepartments = async (): Promise<bffResponse<Department[]>> => {
  try {
    const response = await axiosInstance.get<bffResponse<Department[]>>(
      "/departments"
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return { data: [] };
  }
};
