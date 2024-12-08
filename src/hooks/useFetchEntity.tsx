import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { bffResponse } from "../apiServices/http-config";
import {
  Area,
  Department,
  EntityType,
  Position,
  Role,
  User,
} from "../interfaces/entities";
import { getAreas } from "../apiServices/areasService";
import { getDepartments } from "../apiServices/departmentsService";
import { getPositions } from "../apiServices/positionsService";
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
        return getAreas();
      case "departments":
        return getDepartments();
      case "positions":
        return getPositions();
      case "users":
        return getUsers();
      case "roles":
        return getRoles();
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
