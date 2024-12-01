import React, { useEffect, useState } from "react";
import GenericCRUD from "../components/GenericCRUD";
import { Area, Department } from "../interfaces/entities";
import { Badge } from "../components/Badge";
import { Tooltip, Typography } from "antd";
import { RelatedEntity } from "../components/AlertModal";
import { useFetchEntity } from "../hooks/useFetchEntity";
import { bffResponse } from "../apiServices/http-config";

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
  const [reletedEntities, setRelatedEntities] = useState<RelatedEntity[]>([]);

  const { data: areas, isLoading, isError, refetch } = useFetchEntity("areas");

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
      additionalData={{ areas: initialAreas }}
      refetchData={refetch}
      relatedEntities={reletedEntities}
    />
  );
};

export default AreaCRUD;
