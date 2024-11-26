import { Area } from "../../interfaces/entities";
import { axiosInstance, bffResponse } from "../http-config";

export const getAreas = async (): Promise<bffResponse<Area[]>> => {
  try {
    const response = await axiosInstance.get<bffResponse<Area[]>>("/areas");
    return response.data;
  } catch (error) {
    console.log(error);
    return { data: [] };
  }
};
