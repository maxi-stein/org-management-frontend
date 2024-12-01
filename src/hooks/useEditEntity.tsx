import { useMutation } from "@tanstack/react-query";
import {
  AreaToEdit,
  BffEntityToEdit,
  EntityType,
} from "../interfaces/entities";
import { updateArea } from "../apiServices/areas/areasService";

interface EntityEditData {
  id: string;
  data: BffEntityToEdit;
}
// Este hook maneja la edición de cualquier entidad
export const useEditEntity = (entityType: EntityType) => {
  // Determines the update function according to the entity type
  const editEntity = async ({ id, data }: EntityEditData) => {
    switch (entityType) {
      case "areas":
        return updateArea(id, data as AreaToEdit);
      case "departments":
        return; //TODO: add departments and more entities
      default:
        throw new Error("Entity type not supported");
    }
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: editEntity,
    onSuccess: (data) => {
      console.log("Entity updated successfully:", data);
    },
    onError: (error) => {
      console.error("Error updating entity:", error);
    },
  });

  return { mutateAsync, isPending };
};
