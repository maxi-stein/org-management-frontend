import React, { useEffect, useState } from "react";
import GenericCRUD from "../components/GenericCRUD";
import { Position } from "../interfaces/entities";
import { useFetchEntity } from "../hooks/useFetchEntity";
import { Typography } from "antd";

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

  const {
    data: positions,
    isLoading,
    isError,
    refetch,
  } = useFetchEntity("positions");

  useEffect(() => {
    if (positions && !isLoading) {
      setInitialPositions(positions.data as Position[]);
    }
  }, [positions]);
  return isError ? (
    <Text>An error has occurred</Text>
  ) : (
    <GenericCRUD
      title="Positions"
      items={initialPositions}
      columns={columns}
      isLoading={isLoading}
      entityType="positions"
      additionalFormData={undefined}
      refetchData={refetch}
      selectedId={selectedPositionId}
      setSelectedId={setSelectedPositionId}
      relatedEntities={[]}
    />
  );
};

export default PositionCRUD;
