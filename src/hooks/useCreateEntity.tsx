import { useMutation } from "@tanstack/react-query";
import { BffEntityInput, EntityType } from "../interfaces/entities";
import { createArea } from "../apiServices/areasService";
import { createDepartment } from "../apiServices/departmentsService";
import { createPosition } from "../apiServices/positionsService";
import { createUser } from "../apiServices/userService";

// Definimos la interfaz de tipo genérico, T, que extiende de BffEntityInput
type EntityCreateData<T extends BffEntityInput> = {
  data: T;
};

// Mapeamos los tipos de entrada a los servicios respectivos
const entityServices = {
  areas: createArea,
  departments: createDepartment,
  positions: createPosition,
  users: createUser,
  roles: (data: any) => console.log("Cannot create roles", data),
};

export const useCreateEntity = <T extends BffEntityInput>(
  entityType: EntityType
) => {
  const createEntityHook = async ({ data }: EntityCreateData<T>) => {
    const createFunction = entityServices[entityType]; // Get the create method for the correct entity type
    if (!createFunction) throw new Error("Entity type not supported");

    return createFunction(data);
  };

  const {
    mutateAsync: createEntity,
    isPending: awaitingCreate,
    isError,
  } = useMutation({
    mutationFn: createEntityHook,
    onSuccess: (data) => {
      console.log("Entity created successfully:", data);
    },
    onError: (error) => {
      console.error("Error creating entity:", error);
    },
  });

  return { createEntity, awaitingCreate, isError };
};
