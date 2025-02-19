import { useQuery } from "@tanstack/react-query";
import { BffStatsResponse } from "../../apiServices/http-config";
import {
  getDepartmentsPeopleStats,
  getSeniorityStats,
} from "../../apiServices/statsService";

type availableStats = "departments-people" | "seniority-people";

export const useStats = (type: availableStats) => {
  const { data, isLoading, isError, refetch } = useQuery<BffStatsResponse>({
    queryKey: [`fetch-stats-${type}`],
    queryFn: async () => {
      if (type === "departments-people") {
        return await getDepartmentsPeopleStats();
      }
      if (type === "seniority-people") {
        return await getSeniorityStats();
      }
      throw new Error("Stats type not supported");
    },
  });

  return { data, isLoading, isError, refetch };
};
