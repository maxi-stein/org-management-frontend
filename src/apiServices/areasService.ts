import { Area, AreaInput } from "../interfaces/entities";
import { axiosInstance, bffResponse } from "./http-config";

export const getAreas = async (): Promise<bffResponse<Area[]>> => {
  try {
    const response = await axiosInstance.get<bffResponse<Area[]>>("/areas");
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting areas");
  }
};

export const createArea = async (data: AreaInput): Promise<Area> => {
  try {
    const response = await axiosInstance.post<Area>("/areas", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating area");
  }
};

export const updateArea = async (
  id: string,
  data: AreaInput
): Promise<Area> => {
  try {
    const response = await axiosInstance.put(`/areas/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error updating area");
  }
};

export const deleteArea = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/areas/${id}`);
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting area");
  }
};
