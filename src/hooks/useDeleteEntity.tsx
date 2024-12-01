import { useMutation } from "@tanstack/react-query";
import { EntityType } from "../interfaces/entities";
import { deleteArea } from "../apiServices/areasService";
import { deleteDepartment } from "../apiServices/departmentsService";

export const useDeleteEntity = (entityType: EntityType) => {
  const deleteEntityHook = async (id: string) => {
    switch (entityType) {
      case "areas":
        return deleteArea(id);
      case "departments":
        return deleteDepartment(id);
      default:
        throw new Error("Entity type not supported");
    }
  };

  const { mutateAsync: deleteEntity, isPending: awaitingDeletion } =
    useMutation({
      mutationFn: deleteEntityHook,
      onError: (error) => {
        console.error("Error deleting entity:", error);
      },
    });

  return { deleteEntity, awaitingDeletion };
};
