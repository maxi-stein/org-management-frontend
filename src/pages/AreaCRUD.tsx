import React, { useEffect, useState } from "react";
import GenericCRUD from "../components/GenericCRUD";
import { Area, Department } from "../interfaces/entities";
import { Badge } from "../components/Badge";
import { Tooltip, Typography } from "antd";
import { useFetchEntity } from "../hooks/useFetchEntity";
import { AdditionalData } from "../interfaces/form";

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
  ) : (
    <GenericCRUD
      title="Areas"
      items={initialAreas}
      columns={columns}
      isLoading={isLoading}
      entityType="areas"
      additionalFormData={{ areas: initialAreas } as AdditionalData}
      refetchData={refetch}
      relatedEntities={[]} //there are no entities releated to areas
      selectedId={selectedAreaId}
      setSelectedId={setSelectedAreaId}
    />
  );
};

export default AreaCRUD;
