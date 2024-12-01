import { useQuery } from "@tanstack/react-query";
import { bffResponse } from "../apiServices/http-config";
import { Area, BffEntity, EntityType } from "../interfaces/entities";
import { getAreas } from "../apiServices/areasService";
import { getDepartments } from "../apiServices/departmentsService";

// Este hook es genérico para obtener cualquier entidad
export const useFetchEntity = (entityType: EntityType) => {
  const fetchEntityHook = async () => {
    switch (entityType) {
      case "areas":
        return getAreas();
      case "departments":
        return getDepartments();
      default:
        throw new Error("Entity type not supported");
    }
  };

  // useQuery para obtener los datos
  const { data, isLoading, isError, refetch } = useQuery<
    bffResponse<BffEntity[]>
  >({
    queryKey: [`fetch-${entityType}`],
    queryFn: fetchEntityHook,
  });

  return { data, isLoading, isError, refetch };
};
