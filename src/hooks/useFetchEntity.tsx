import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { bffResponse } from "../apiServices/http-config";
import {
  Area,
  Department,
  EntityType,
  Position,
  PositionLevel,
  Role,
  User,
} from "../interfaces/entities";
import { getAreas } from "../apiServices/areasService";
import { getDepartments } from "../apiServices/departmentsService";
import {
  getPositionLevels,
  getPositions,
} from "../apiServices/positionsService";
import { getUsers } from "../apiServices/userService";
import { getRoles } from "../apiServices/rolesService";

type EntityMap = {
  areas: Area[];
  departments: Department[];
  positions: Position[];
  users: User[];
  roles: Role[];
};

export const useFetchEntity = <T extends EntityType>(entityType: T) => {
  const fetchEntityHook = async () => {
    switch (entityType) {
      case "areas":
        return await getAreas();
      case "departments":
        return await getDepartments();
      case "positions":
        return await getPositions();
      case "users":
        return await getUsers();
      case "roles":
        return await getRoles();
      default:
        throw new Error("Entity type not supported");
    }
  };

  const {
    data,
    isLoading,
    isError,
    refetch,
  }: UseQueryResult<bffResponse<EntityMap[T]>> = useQuery({
    queryKey: [`fetch-${entityType}`],
    queryFn: fetchEntityHook,
    enabled: false,
  });

  return { data, isLoading, isError, refetch };
};

export const useFetchPositionLevels = () => {
  const { data, isLoading, isError, refetch } = useQuery<PositionLevel[]>({
    queryKey: ["fetch-position-levels"],
    queryFn: async () => {
      const response = await getPositionLevels();
      return response.data;
    },
    enabled: false,
  });

  return { data, isLoading, isError, refetch };
};
