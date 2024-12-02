import { useMutation } from "@tanstack/react-query";
import {
  AreaInput,
  BffEntityInput,
  DepartmentInput,
  EntityType,
} from "../interfaces/entities";
import { updateArea } from "../apiServices/areasService";
import { updateDepartment } from "../apiServices/departmentsService";

interface EntityEditData {
  id: string;
  data: BffEntityInput;
}
export const useEditEntity = (entityType: EntityType) => {
  // Determines the update function according to the entity type
  const editEntityHook = async ({ id, data }: EntityEditData) => {
    switch (entityType) {
      case "areas":
        return updateArea(id, data as AreaInput);
      case "departments":
        return updateDepartment(id, data as DepartmentInput);
      default:
        throw new Error("Entity type not supported");
    }
  };

  const { mutateAsync: editEntity, isPending: awaitingEdit } = useMutation({
    mutationFn: editEntityHook,
    onSuccess: (data) => {
      console.log("Entity updated successfully:", data);
    },
    onError: (error) => {
      console.error("Error updating entity:", error);
    },
  });

  return { editEntity, awaitingEdit };
};
