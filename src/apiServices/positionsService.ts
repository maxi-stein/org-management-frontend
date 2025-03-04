import { Position, PositionInput, PositionLevel } from "../interfaces/entities";
import {
  axiosInstance,
  bffResponse,
  PositionLevelsResponse,
} from "./http-config";

export const getPositions = async (): Promise<bffResponse<Position[]>> => {
  try {
    const response = await axiosInstance.get<bffResponse<Position[]>>(
      "/positions"
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting positions");
  }
};

export const getPositionLevels = async (): Promise<PositionLevelsResponse> => {
  try {
    const response = await axiosInstance.get<PositionLevelsResponse>(
      "/positions/levels"
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting position levels");
  }
};

export const createPosition = async (
  data: PositionInput
): Promise<Position> => {
  try {
    const response = await axiosInstance.post<Position>("/positions", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating position");
  }
};

export const updatePosition = async (
  id: string,
  data: PositionInput
): Promise<Position> => {
  try {
    const response = await axiosInstance.put(`/positions/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error updating position");
  }
};

export const deletePosition = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/positions/${id}`);
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting position");
  }
};
