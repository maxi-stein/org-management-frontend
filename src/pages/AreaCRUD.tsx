import React, { useEffect, useState } from "react";
import GenericCRUD from "../components/GenericCRUD";
import { Area } from "../interfaces/entities";
import { useFetchEntity } from "../hooks/useFetchEntity";
import LoadingSpinner from "../components/LoadingSpinner";
import {} from "../helpers/formHelpers";
import { getColumnsForm } from "../hooks/useColumnsForm";
import { Typography } from "antd";

const { Text } = Typography;

const columns = getColumnsForm["areas"];

const AreaCRUD: React.FC = () => {
  const [initialAreas, setInitialAreas] = useState<Area[]>([]);
  const { data: areas, isLoading, isError, refetch } = useFetchEntity("areas");
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null);

  useEffect(() => {
    if (areas && !isLoading) {
      setInitialAreas(areas.data as Area[]);
    }
  }, [areas]);

  return isError ? (
    <Text>An error has occurred</Text>
  ) : isLoading ? (
    <LoadingSpinner message="Loading Areas..." />
  ) : (
    <GenericCRUD
      title="Areas"
      items={initialAreas}
      columns={columns}
      entityType="areas"
      refetchData={refetch}
      relatedEntities={[]} //there are no entities releated to areas
      selectedId={selectedAreaId}
      setSelectedId={setSelectedAreaId}
    />
  );
};

export default AreaCRUD;
