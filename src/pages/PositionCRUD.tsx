import React, { useEffect, useState } from "react";
import GenericCRUD from "../components/GenericCRUD";
import { Position, User } from "../interfaces/entities";
import { useFetchEntity } from "../hooks/useFetchEntity";
import { Typography } from "antd";
import LoadingSpinner from "../components/LoadingSpinner";
import { useReletedEntities } from "../hooks/useReletedEntities";
import { RelatedEntity } from "../components/AlertModal";

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
  const [relatedEntities, setRelatedEntities] = useState<RelatedEntity[]>([]);

  const {
    data: positions,
    isLoading,
    isError,
    refetch,
  } = useFetchEntity("positions");

  //once positions are fetched, I set the initial positions
  useEffect(() => {
    if (positions && !isLoading) {
      setInitialPositions(positions.data as Position[]);
    }
  }, [positions]);

  const { data: relatedUsers, refetch: refetchRelatedUsers } =
    useReletedEntities(selectedPositionId, "positions");

  //get related users when a position is selected
  useEffect(() => {
    refetchRelatedUsers();
  }, [selectedPositionId]);

  //once related users are fetched, I set the related entities
  useEffect(() => {
    if (relatedUsers && relatedUsers.length > 0) {
      const filteredUsers = relatedUsers as User[];
      setRelatedEntities([
        {
          type: "users",
          items: filteredUsers.map((u) => {
            return { name: u.firstName + " " + u.lastName };
          }),
        },
      ]);
    } else {
      setRelatedEntities([]);
    }
  }, [relatedUsers]);

  return isError ? (
    <Text>An error has occurred</Text>
  ) : isLoading ? (
    <LoadingSpinner message="Loading Positions..." />
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
      relatedEntities={relatedEntities}
    />
  );
};

export default PositionCRUD;
