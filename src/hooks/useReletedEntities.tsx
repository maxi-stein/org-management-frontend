import { useQuery } from "@tanstack/react-query";
import { Area, BffEntity, EntityType } from "../interfaces/entities";
import { getAreas } from "../apiServices/areasService";

const getRelatedAreasForDepartment = async (id: string | null) => {
  if (!id) return [];
  try {
    const areas = await getAreas();
    return areas.data.filter((area) =>
      area.departments.find((dept) => dept._id === id)
    ) as Area[];
  } catch (error) {
    console.log(error);
    return [] as Area[];
  }
};

export const useReletedEntities = (
  id: string | null,
  entityType: EntityType
) => {
  const fetchRelatedEntities = async () => {
    switch (entityType) {
      case "areas":
        return []; //there are no entities releated to areas
      case "departments":
        return getRelatedAreasForDepartment(id);
      default:
        return [];
    }
  };

  const { data, isLoading, isError, refetch } = useQuery<BffEntity[]>({
    queryKey: [`fetch-related-${entityType}`],
    queryFn: fetchRelatedEntities,
  });

  return { data, isLoading, isError, refetch };
};
