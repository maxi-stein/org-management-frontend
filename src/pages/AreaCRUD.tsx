import React, { useEffect, useState } from "react";
import GenericCRUD from "../components/GenericCRUD";
import { Area, Department } from "../interfaces/entities";
import { Badge } from "../components/Badge";
import { Tooltip, Typography } from "antd";
import { useFetchEntity } from "../hooks/useFetchEntity";
import LoadingSpinner from "../components/LoadingSpinner";

const { Text } = Typography;

const renderDepartments = (departments: Department[]) => {
  return departments.map((dept) => (
    <Tooltip key={dept._id} title={dept.description}>
      <span>
        <Badge key={dept._id} text={dept.name} status="active" />
      </span>
    </Tooltip>
  ));
};

const columns = [
  { title: "Name", dataIndex: "name", key: "name" },
  {
    title: "Departments",
    dataIndex: "departments",
    key: "departments",
    render: (departments: Department[]) => renderDepartments(departments),
  },
];

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
      additionalFormData={{ areas: initialAreas }}
      refetchData={refetch}
      relatedEntities={[]} //there are no entities releated to areas
      selectedId={selectedAreaId}
      setSelectedId={setSelectedAreaId}
    />
  );
};

export default AreaCRUD;
