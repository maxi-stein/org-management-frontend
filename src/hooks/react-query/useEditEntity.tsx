import { useMutation } from "@tanstack/react-query";
import {
  AreaInput,
  BffEntityInput,
  DepartmentInput,
  EntityType,
  PositionInput,
  UserInput,
} from "../../interfaces/entities";
import { updateArea } from "../../apiServices/areasService";
import { updateDepartment } from "../../apiServices/departmentsService";
import { updatePosition } from "../../apiServices/positionsService";
import { updateUser } from "../../apiServices/userService";

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
      case "users":
        return await updateUser(id, data as UserInput);
      default:
        throw new Error("Entity type not supported");
    }
  };

  const {
    mutateAsync: editEntity,
    isPending: awaitingEdit,
    isError,
  } = useMutation({
    mutationFn: editEntityHook,
    onError: (error) => {
      console.error("Error updating entity:", error);
    },
  });

  return { editEntity, awaitingEdit, isError };
};
