import React, { useEffect, useState } from "react";
import GenericCRUD from "../components/GenericCRUD";
import { Area, Department } from "../interfaces/entities";
import { useQuery } from "@tanstack/react-query";
import { getAreas } from "../apiServices/areas/areasService";
import { bffResponse } from "../apiServices/http-config";
import { Badge } from "../components/Badge";
import { Tooltip } from "antd";

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
  const {
    data: areas,
    isLoading: isLoadingAreas,
    isError: isErrorAreas,
    refetch: refetchAreas,
  } = useQuery<bffResponse<Area[]>>({
    queryKey: ["fetch-areas"],
    queryFn: async () => {
      const response = await getAreas();
      return response;
    },
  });

  useEffect(() => {
    if (areas && !isLoadingAreas) {
      setInitialAreas(areas.data);
    }
  }, [areas]);

  return isErrorAreas ? (
    <div>An error has occurred</div>
  ) : (
    <GenericCRUD
      title="Areas"
      items={initialAreas}
      columns={columns}
      isLoading={isLoadingAreas}
      entityType="areas"
      additionalData={{ areas: initialAreas }}
      refetchData={refetchAreas}
    />
  );
};

export default AreaCRUD;
