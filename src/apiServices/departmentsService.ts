import { Department, DepartmentInput } from "../interfaces/entities";
import { axiosInstance, bffResponse } from "./http-config";

export const getDepartments = async (): Promise<bffResponse<Department[]>> => {
  try {
    const response = await axiosInstance.get<bffResponse<Department[]>>(
      "/departments"
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return { data: [] };
  }
};

export const createDepartment = async (
  data: DepartmentInput
): Promise<Department> => {
  try {
    const response = await axiosInstance.post<Department>("/departments", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating department");
  }
};

export const updateDepartment = async (
  id: string,
  data: DepartmentInput
): Promise<Department> => {
  try {
    const response = await axiosInstance.put(`/departments/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error updating department");
  }
};

export const deleteDepartment = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/departments/${id}`);
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting department");
  }
};
