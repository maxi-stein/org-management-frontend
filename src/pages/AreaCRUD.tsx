import React, { useState } from "react";
import GenericCRUD from "../components/GenericCRUD";
import LoadingSpinner from "../components/assets/LoadingSpinner";
import {} from "../helpers/formHelpers";
import { getColumnsForm } from "../hooks/useColumnsForm";
import { Typography } from "antd";
import { useDataContext } from "../contexts/dataContext";

const { Text } = Typography;

const columns = getColumnsForm["areas"];

const AreaCRUD: React.FC = () => {
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null);
  const dataContext = useDataContext();
  const { data: areasData, isLoading, isError, fetchAreas } = dataContext.areas;

  const { data: departments, fetchDepartments } = dataContext.departments;

  //if the data is not loaded, fetch it (departments are used in the useItemsForm hook)
  if (!departments) {
    fetchDepartments();
  }

  //if the data is not loaded, fetch it
  if (!areasData) {
    fetchAreas();
  }

  return isError ? (
    <Text>An error has occurred</Text>
  ) : isLoading ? (
    <LoadingSpinner message="Loading Areas..." />
  ) : (
    <GenericCRUD
      title="Areas"
      items={areasData?.data}
      columns={columns}
      entityType="areas"
      refetchData={fetchAreas}
      relatedEntities={[]} //there are no entities releated to areas
      selectedId={selectedAreaId}
      setSelectedId={setSelectedAreaId}
    />
  );
};

export default AreaCRUD;
