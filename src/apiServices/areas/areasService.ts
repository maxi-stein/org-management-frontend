import { Area, AreaToEdit } from "../../interfaces/entities";
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

export const updateArea = async (
  id: string,
  data: AreaToEdit
): Promise<Area> => {
  try {
    const response = await axiosInstance.put(`/areas/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error updating area");
  }
};
