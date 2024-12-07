import React, { useEffect, useState } from "react";
import GenericCRUD from "../components/GenericCRUD";
import { Position, User } from "../interfaces/entities";
import { useFetchEntity } from "../hooks/useFetchEntity";
import { Typography } from "antd";
import LoadingSpinner from "../components/LoadingSpinner";

const { Text } = Typography;

const columns = [
  { title: "Level", dataIndex: "level", key: "level" },
  { title: "Title", dataIndex: "title", key: "title" },
];

const PositionCRUD: React.FC = () => {
  const [initialPositions, setInitialPositions] = useState<Position[]>([]);
  const [selectedPositionId, setSelectedPositionId] = useState<string | null>(
    null
  );
  const [relatedUsers, setRelatedUsers] = useState<User[]>([]);

  const {
    data: positions,
    isLoading,
    isError,
    refetch,
  } = useFetchEntity("positions");

  const { data: relatedUsersData, isLoading: isLoadingRelatedUsers } =
    useFetchEntity("users");

  //once positions are fetched, I set the initial positions
  useEffect(() => {
    if (positions && !isLoading) {
      setInitialPositions(positions.data as Position[]);
    }
  }, [positions]);

  //every time I select a position, I search for the users that have that position
  useEffect(() => {
    const filteredUsers = relatedUsersData?.data.filter((user: User) => {
      return user.position?._id == selectedPositionId;
    }) as User[];
    setRelatedUsers(filteredUsers);
  }, [selectedPositionId]);

  return isError ? (
    <Text>An error has occurred</Text>
  ) : isLoading || isLoadingRelatedUsers ? (
    <LoadingSpinner message="Loading positions..." />
  ) : (
    <GenericCRUD
      title="Positions"
      items={initialPositions}
      columns={columns}
      entityType="positions"
      additionalFormData={undefined}
      refetchData={refetch}
      selectedId={selectedPositionId}
      setSelectedId={setSelectedPositionId}
      relatedEntities={[
        {
          type: "users",
          items: relatedUsers?.map((u) => {
            return { name: u.firstName.concat(" ", u.lastName) };
          }),
        },
      ]}
    />
  );
};

export default PositionCRUD;
