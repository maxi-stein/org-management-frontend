import { useMutation } from "@tanstack/react-query";
import { AreaInput, BffEntityInput, EntityType } from "../interfaces/entities";
import { updateArea } from "../apiServices/areas/areasService";

interface EntityEditData {
  id: string;
  data: BffEntityInput;
}
// Este hook maneja la edición de cualquier entidad
export const useEditEntity = (entityType: EntityType) => {
  // Determines the update function according to the entity type
  const editEntity = async ({ id, data }: EntityEditData) => {
    switch (entityType) {
      case "areas":
        return updateArea(id, data as AreaInput);
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
