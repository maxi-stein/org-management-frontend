import { axiosInstance, BffStatsResponse } from "./http-config";

export const getDepartmentsPeopleStats =
  async (): Promise<BffStatsResponse> => {
    try {
      const response = await axiosInstance.get<BffStatsResponse>(
        "/stats/departments-people"
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("Error getting departments stats");
    }
  };
export const getSeniorityStats = async (): Promise<BffStatsResponse> => {
  try {
    const response = await axiosInstance.get<BffStatsResponse>(
      "/stats/seniorities"
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting seniorities stats");
  }
};
