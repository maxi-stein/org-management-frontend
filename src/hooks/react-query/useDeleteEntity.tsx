import { useMutation } from "@tanstack/react-query";
import { EntityType } from "../../interfaces/entities";
import { deleteArea } from "../../apiServices/areasService";
import { deleteDepartment } from "../../apiServices/departmentsService";
import { deletePosition } from "../../apiServices/positionsService";
import { deleteUser } from "../../apiServices/userService";
export const useDeleteEntity = (entityType: EntityType) => {
  const deleteEntityHook = async (id: string) => {
    switch (entityType) {
      case "areas":
        return await deleteArea(id);
      case "departments":
        return await deleteDepartment(id);
      case "positions":
        return await deletePosition(id);
      case "users":
        return await deleteUser(id);
      default:
        throw new Error("Entity type not supported");
    }
  };

  const {
    mutateAsync: deleteEntity,
    isPending: awaitingDeletion,
    isError,
  } = useMutation({
    mutationFn: deleteEntityHook,
    onError: (error) => {
      console.error("Error deleting entity:", error);
    },
  });

  return { deleteEntity, awaitingDeletion, isError };
};
