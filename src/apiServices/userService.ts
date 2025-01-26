import { User, UserInput } from "../interfaces/entities";
import { axiosInstance, bffResponse } from "./http-config";

export const getUsers = async (): Promise<bffResponse<User[]>> => {
  try {
    const response = await axiosInstance.get<bffResponse<User[]>>("/users");
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting users");
  }
};

export const getUser = async (id: string): Promise<bffResponse<User[]>> => {
  try {
    const response = await axiosInstance.get<bffResponse<User[]>>(
      `/users/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting user with id: " + id);
  }
};

export const createUser = async (data: UserInput): Promise<User> => {
  try {
    const response = await axiosInstance.post<User>("/users", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating user");
  }
};

export const updateUser = async (
  id: string,
  data: UserInput
): Promise<User> => {
  try {
    const response = await axiosInstance.put(`/users/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error updating user");
  }
};

export const deleteUser = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/users/${id}`);
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting user");
  }
};
