import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  bffResponse,
  PositionLevelsResponse,
} from "../apiServices/http-config";
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
import {
  getPositionLevels,
  getPositions,
} from "../apiServices/positionsService";
import { getUsers } from "../apiServices/userService";
import { getRoles } from "../apiServices/rolesService";
import { useDataContext } from "../contexts/dataContext";

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
  const { data, isLoading, isError, refetch } =
    useQuery<PositionLevelsResponse>({
      queryKey: ["fetch-position-levels"],
      queryFn: async () => {
        return await getPositionLevels();
      },
      enabled: false,
    });

  return { data, isLoading, isError, refetch };
};

//map the key to the value of the position level. Eg: "JR" => "Junior"
export const useLevelValue = (key: string) => {
  const levels = useDataContext().positionLevels.data?.data;
  return levels?.find((level) => level.value === key)?.label;
};
