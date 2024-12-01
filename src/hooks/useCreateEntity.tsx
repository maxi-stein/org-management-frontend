import { useMutation } from "@tanstack/react-query";
import { AreaInput, BffEntityInput, EntityType } from "../interfaces/entities";
import { createArea } from "../apiServices/areasService";

interface EntityCreateData {
  data: BffEntityInput;
}

export const useCreateEntity = (entityType: EntityType) => {
  const createEntityHook = async ({ data }: EntityCreateData) => {
    switch (entityType) {
      case "areas":
        return createArea(data as AreaInput);
      case "departments":
        return; //TODO: departments create
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
