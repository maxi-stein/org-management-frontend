import { Role } from "../interfaces/entities";
import { axiosInstance, bffResponse } from "./http-config";

export const getRoles = async (): Promise<bffResponse<Role[]>> => {
  try {
    const response = await axiosInstance.get<bffResponse<Role[]>>("/roles");
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting roles");
  }
};
