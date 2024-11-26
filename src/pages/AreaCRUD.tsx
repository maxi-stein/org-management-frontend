import React, { useEffect, useState } from "react";
import GenericCRUD from "../components/GenericCRUD";
import { Area } from "../interfaces/entities";
import { useQuery } from "@tanstack/react-query";
import { getAreas } from "../apiServices/areas/areasService";
import { bffResponse } from "../apiServices/http-config";

const columns = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Departments", dataIndex: "departmentss", key: "departmentss" },
];

const AreaCRUD: React.FC = () => {
  const [initialAreas, setInitialAreas] = useState<Area[]>([]);
  const { data, isLoading, isError } = useQuery<bffResponse<Area[]>>({
    queryKey: ["fetch-areas"],
    queryFn: async () => {
      const response = await getAreas();
      return response;
    },
  });

  useEffect(() => {
    if (data && !isLoading) {
      setInitialAreas(data.data);
    }
  }, [data]);

  return isError ? (
    <div>An error has occurred</div>
  ) : (
    <GenericCRUD
      title="Areas"
      items={initialAreas}
      columns={columns}
      isLoading={isLoading}
    />
  );
};

export default AreaCRUD;
