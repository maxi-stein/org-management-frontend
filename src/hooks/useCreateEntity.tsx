import { useMutation } from "@tanstack/react-query";
import {
  AreaInput,
  BffEntityInput,
  DepartmentInput,
  EntityType,
  PositionInput,
  UserInput,
} from "../interfaces/entities";
import { createArea } from "../apiServices/areasService";
import { createDepartment } from "../apiServices/departmentsService";
import { createPosition } from "../apiServices/positionsService";
import { createUser } from "../apiServices/userService";

interface EntityCreateData {
  data: BffEntityInput;
}

export const useCreateEntity = (entityType: EntityType) => {
  const createEntityHook = async ({ data }: EntityCreateData) => {
    switch (entityType) {
      case "areas":
        return await createArea(data as AreaInput);
      case "departments":
        return await createDepartment(data as DepartmentInput);
      case "positions":
        return await createPosition(data as PositionInput);
      case "users":
        return await createUser(data as UserInput);
      default:
        throw new Error("Entity type not supported");
    }
  };

  const { mutateAsync: createEntity, isPending: awaitingCreate } = useMutation({
    mutationFn: createEntityHook,
    onSuccess: (data) => {
      console.log("Entity created successfully:", data);
    },
    onError: (error) => {
      console.error("Error creating entity:", error);
    },
  });

  return { createEntity, awaitingCreate };
};
