import { useQuery } from "@tanstack/react-query";
import { Area, BffEntity, EntityType, User } from "../interfaces/entities";
import { getAreas } from "../apiServices/areasService";
import { getUsers } from "../apiServices/userService";

const getRelatedAreasForDepartment = async (id: string | null) => {
  if (!id) return [];
  try {
    const areas = await getAreas();
    return areas.data.filter((area) =>
      area.departments.find((dept) => dept._id === id)
    ) as Area[];
  } catch (error) {
    console.log(error);
    throw new Error("Error getting related areas");
  }
};

const getRelatedUsersForPosition = async (id: string | null) => {
  if (!id) return [];
  try {
    const users = await getUsers();
    return users.data.filter((user: User) => {
      return user.position?._id == id;
    }) as User[];
  } catch (error) {
    console.log(error);
    throw new Error("Error getting related users");
  }
};

const getSupervisedEmployees = async (id: string | null) => {
  if (!id) return [];
  try {
    const users = await getUsers();
    const supervisedEmployees = users.data.find(
      (user: User) => user._id == id
    )?.supervisedEmployees;

    if (!supervisedEmployees) return [];
    return users.data.filter((user: User) => {
      return supervisedEmployees.find((emp) => emp._id == user._id);
    }) as User[];
  } catch (error) {
    console.log(error);
    throw new Error("Error getting supervised employees");
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
      case "positions":
        return getRelatedUsersForPosition(id);
      case "users":
        return getSupervisedEmployees(id);
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
