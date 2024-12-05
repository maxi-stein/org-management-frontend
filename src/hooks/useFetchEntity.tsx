import { useQuery } from "@tanstack/react-query";
import { bffResponse } from "../apiServices/http-config";
import { BffEntity, EntityType } from "../interfaces/entities";
import { getAreas } from "../apiServices/areasService";
import { getDepartments } from "../apiServices/departmentsService";
import { getPositions } from "../apiServices/positionsService";

export const useFetchEntity = (entityType: EntityType) => {
  const fetchEntityHook = async () => {
    switch (entityType) {
      case "areas":
        return getAreas();
      case "departments":
        return getDepartments();
      case "positions":
        return getPositions();
      default:
        throw new Error("Entity type not supported");
    }
  };

  const { data, isLoading, isError, refetch } = useQuery<
    bffResponse<BffEntity[]>
  >({
    queryKey: [`fetch-${entityType}`],
    queryFn: fetchEntityHook,
  });

  return { data, isLoading, isError, refetch };
};
