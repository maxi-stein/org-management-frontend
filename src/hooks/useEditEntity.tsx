import { useMutation } from "@tanstack/react-query";
import {
  AreaInput,
  BffEntityInput,
  DepartmentInput,
  EntityType,
  PositionInput,
} from "../interfaces/entities";
import { updateArea } from "../apiServices/areasService";
import { updateDepartment } from "../apiServices/departmentsService";
import { updatePosition } from "../apiServices/positionsService";

interface EntityEditData {
  id: string;
  data: BffEntityInput;
}

export const useEditEntity = (entityType: EntityType) => {
  // Determines the update function according to the entity type
  const editEntityHook = async ({ id, data }: EntityEditData) => {
    switch (entityType) {
      case "areas":
        return await updateArea(id, data as AreaInput);
      case "departments":
        return await updateDepartment(id, data as DepartmentInput);
      case "positions":
        return await updatePosition(id, data as PositionInput);
      default:
        throw new Error("Entity type not supported");
    }
  };

  const { mutateAsync: editEntity, isPending: awaitingEdit } = useMutation({
    mutationFn: editEntityHook,
    onSuccess: (data) => {},
    onError: (error) => {
      console.error("Error updating entity:", error);
    },
  });

  return { editEntity, awaitingEdit };
};
