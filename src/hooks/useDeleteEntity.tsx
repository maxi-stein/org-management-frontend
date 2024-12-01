import { useMutation } from "@tanstack/react-query";
import { EntityType } from "../interfaces/entities";
import { deleteArea } from "../apiServices/areasService";

export const useDeleteEntity = (entityType: EntityType) => {
  const deleteEntityHook = async (id: string) => {
    switch (entityType) {
      case "areas":
        return deleteArea(id);
      case "departments":
        return; //TODO: departments delete
      default:
        throw new Error("Entity type not supported");
    }
  };

  const { mutateAsync: deleteEntity, isPending: awaitingDeletion } =
    useMutation({
      mutationFn: deleteEntityHook,
      onSuccess: (data) => {
        console.log("Entity deleted successfully:", data);
      },
      onError: (error) => {
        console.error("Error deleting entity:", error);
      },
    });

  return { deleteEntity, awaitingDeletion };
};
