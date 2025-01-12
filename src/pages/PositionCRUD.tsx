import React, { useEffect, useState } from "react";
import GenericCRUD from "../components/GenericCRUD";
import { Typography } from "antd";
import LoadingSpinner from "../components/LoadingSpinner";
import { RelatedEntity } from "../components/AlertModal";
import { getColumnsForm } from "../hooks/useColumnsForm";
import { useDataContext } from "../contexts/dataContext";
import { User } from "../interfaces/entities";

const { Text } = Typography;

const columns = getColumnsForm["positions"];

const PositionCRUD: React.FC = () => {
  const [selectedPositionId, setSelectedPositionId] = useState<string | null>(
    null
  );
  const dataContext = useDataContext();
  const [relatedEntities, setRelatedEntities] = useState<RelatedEntity[]>([]);

  const {
    data: positionsData,
    isLoading,
    isError,
    fetchPositions,
  } = dataContext.positions;
  if (!positionsData) fetchPositions();

  //users are needed for getting related users for selected position
  const {
    data: users,
    fetchUsers,
    isLoading: isLoadingUsersRelated,
    isError: isErrorUsers,
  } = dataContext.users;
  if (!users) fetchUsers();

  const getRelatedUsersForPosition = (
    selectedPositionId: string | null,
    users: User[] | undefined
  ) => {
    if (!selectedPositionId) return [];
    return users?.filter((user: User) => {
      return user.position?._id == selectedPositionId;
    }) as User[];
  };

  //get related users when a position is selected
  useEffect(() => {
    if (selectedPositionId !== null) {
      const relatedUsers = getRelatedUsersForPosition(
        selectedPositionId,
        users?.data
      );
      if (relatedUsers && relatedUsers.length > 0) {
        setRelatedEntities([
          {
            type: "users",
            items: relatedUsers.map((u) => {
              return { name: u.firstName + " " + u.lastName };
            }),
          },
        ]);
      }
    }
  }, [selectedPositionId, users?.data]);

  return isError || isErrorUsers ? (
    <Text>An error has occurred</Text>
  ) : isLoading || isLoadingUsersRelated ? (
    <LoadingSpinner message="Loading Positions..." />
  ) : (
    <GenericCRUD
      title="Positions"
      items={positionsData?.data}
      columns={columns}
      entityType="positions"
      refetchData={fetchPositions}
      selectedId={selectedPositionId}
      setSelectedId={setSelectedPositionId}
      relatedEntities={relatedEntities}
    />
  );
};

export default PositionCRUD;
