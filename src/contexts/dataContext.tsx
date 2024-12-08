import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Area,
  Department,
  Position,
  User,
  Role,
  EntityType,
} from "../interfaces/entities";
import { useFetchEntity } from "../hooks/useFetchEntity";
import { QueryObserverResult } from "@tanstack/react-query";
import { bffResponse } from "../apiServices/http-config";
import { useCreateEntity } from "../hooks/useCreateEntity";
import { useEditEntity } from "../hooks/useEditEntity";
import { useDeleteEntity } from "../hooks/useDeleteEntity";

interface editProps {
  id: string;
  data: any;
}
interface DataContextType {
  areas: {
    data: bffResponse<Area[]> | undefined;
    fetchAreas: () => Promise<QueryObserverResult<bffResponse<any[]>, Error>>;
    addArea: (area: any) => void;
    editArea: ({ id, data }: editProps) => void;
    deleteArea: (id: string) => void;
    isLoading: boolean;
    isError: boolean;
  };

  departments: {
    data: bffResponse<Department[]> | undefined;
    fetchDepartments: () => Promise<
      QueryObserverResult<bffResponse<any[]>, Error>
    >;
    addDepartment: (department: any) => void;
    editDepartment: ({ id, data }: editProps) => void;
    deleteDepartment: (id: string) => void;
    isLoading: boolean;
    isError: boolean;
  };

  positions: {
    data: bffResponse<Position[]> | undefined;
    fetchPositions: () => Promise<
      QueryObserverResult<bffResponse<any[]>, Error>
    >;
    addPosition: (position: any) => void;
    editPosition: ({ id, data }: editProps) => void;
    deletePosition: (id: string) => void;
    isLoading: boolean;
    isError: boolean;
  };

  users: {
    data: bffResponse<User[]> | undefined;
    fetchUsers: () => Promise<QueryObserverResult<bffResponse<any[]>, Error>>;
    addUser: (user: any) => void;
    editUser: ({ id, data }: editProps) => void;
    isLoading: boolean;
    isError: boolean;
  };

  roles: {
    data: bffResponse<Role[]> | undefined;
    fetchRoles: () => Promise<QueryObserverResult<bffResponse<any[]>, Error>>;
    isLoading: boolean;
    isError: boolean;
  };
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Custom hook to access the data context
export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

// DataProvider component
export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  type EntityMap = {
    areas: Area[];
    departments: Department[];
    positions: Position[];
    users: User[];
    roles: Role[];
  };

  //Create a method to dinamically get the CRUD methods, data response, loadings and errors
  const useEntityHooks = <T extends EntityType>(entityType: T) => {
    const { data, isLoading, isError, refetch } = useFetchEntity(entityType);
    const dataQuery = data as bffResponse<EntityMap[T]> | undefined;
    const {
      createEntity,
      awaitingCreate,
      isError: createError,
    } = useCreateEntity(entityType);
    const {
      editEntity,
      awaitingEdit,
      isError: editError,
    } = useEditEntity(entityType);
    const { deleteEntity, isError: deleteError } = useDeleteEntity(entityType);

    return {
      dataQuery,
      isLoading,
      isError: isError || createError || editError || deleteError,
      refetch,
      createEntity,
      awaitingCreate,
      editEntity,
      awaitingEdit,
      deleteEntity,
    };
  };

  //Use the useEntityHooks to dinamically create, edit and delete areas
  const {
    dataQuery: areasData,
    isLoading: isLoadingAreas,
    awaitingCreate: isCreatingArea,
    awaitingEdit: isEditingArea,
    isError: areasError,
    refetch: fetchAreas,
    createEntity: createArea,
    editEntity: editArea,
    deleteEntity: deleteArea,
  } = useEntityHooks("areas");

  //Use the useEntityHooks to dinamically create, edit and delete departments
  const {
    dataQuery: departmentsData,
    isLoading: isLoadingDepartments,
    awaitingCreate: isCreatingDepartment,
    awaitingEdit: isEditingDepartment,
    isError: departmentsError,
    refetch: fetchDepartments,
    createEntity: createDepartment,
    editEntity: editDepartment,
    deleteEntity: deleteDepartment,
  } = useEntityHooks("departments");

  //Use the useEntityHooks to dinamically create, edit and delete positions
  const {
    dataQuery: positionsData,
    isLoading: isLoadingPositions,
    awaitingCreate: isCreatingPosition,
    awaitingEdit: isEditingPosition,
    isError: positionsError,
    refetch: fetchPositions,
    createEntity: createPosition,
    editEntity: editPosition,
    deleteEntity: deletePosition,
  } = useEntityHooks("positions");

  //Use the useEntityHooks to dinamically create, edit and delete users
  const {
    dataQuery: usersData,
    isLoading: isLoadingUsers,
    awaitingCreate: isCreatingUser,
    awaitingEdit: isEditingUser,
    isError: usersError,
    refetch: fetchUsers,
    createEntity: createUser,
    editEntity: editUser,
  } = useEntityHooks("users");

  //Use the useEntityHooks to dinamically create, edit and delete roles
  const {
    dataQuery: rolesData,
    isLoading: isLoadingRoles,
    isError: rolesError,
    refetch: fetchRoles,
  } = useEntityHooks("roles");

  return (
    <DataContext.Provider
      value={{
        areas: {
          data: areasData,
          fetchAreas: fetchAreas,
          addArea: createArea,
          editArea,
          deleteArea,
          isLoading: isLoadingAreas || isCreatingArea || isEditingArea,
          isError: areasError,
        },
        departments: {
          data: departmentsData,
          fetchDepartments: fetchDepartments,
          addDepartment: createDepartment,
          editDepartment,
          deleteDepartment,
          isLoading:
            isLoadingDepartments || isCreatingDepartment || isEditingDepartment,
          isError: departmentsError,
        },
        positions: {
          data: positionsData,
          fetchPositions: fetchPositions,
          addPosition: createPosition,
          editPosition,
          deletePosition,
          isLoading:
            isLoadingPositions || isCreatingPosition || isEditingPosition,
          isError: positionsError,
        },
        users: {
          data: usersData,
          fetchUsers: fetchUsers,
          addUser: createUser,
          editUser,
          isLoading: isLoadingUsers || isCreatingUser || isEditingUser,
          isError: usersError,
        },
        roles: {
          data: rolesData,
          fetchRoles: fetchRoles,
          isError: rolesError,
          isLoading: isLoadingRoles || isCreatingUser || isEditingUser,
        },
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
