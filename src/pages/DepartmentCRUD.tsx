import React, { useEffect, useState } from "react";
import GenericCRUD from "../components/GenericCRUD";
import { Area } from "../interfaces/entities";
import { Typography } from "antd";
import { RelatedEntity } from "../components/AlertModal";
import { getColumnsForm } from "../hooks/useColumnsForm";
import { useDataContext } from "../contexts/dataContext";
import LoadingSpinner from "../components/assets/LoadingSpinner";
import { useStats } from "../hooks/react-query/useStats";

const { Text } = Typography;

const columns = getColumnsForm["departments"];

const DepartmentCRUD: React.FC = () => {
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<
    string | null
  >(null);
  const dataContext = useDataContext();
  const [relatedEntities, setRelatedEntities] = useState<RelatedEntity[]>([]);
  const { refetch: refetchDeptPeopleStats } = useStats("departments-people");

  const {
    data: departmentsData,
    isLoading,
    isError,
    fetchDepartments,
  } = dataContext.departments;
  if (!departmentsData) fetchDepartments();

  //areas are needed for getting related areas for selected department
  const {
    data: areas,
    fetchAreas,
    isLoading: isLoadingAreas,
    isError: isErrorAreas,
  } = dataContext.areas;
  if (!areas) fetchAreas();

  const getRelatedAreasForDepartment = (
    selectedDepartmentId: string,
    areas: Area[] | undefined
  ) => {
    if (!selectedDepartmentId) return [];
    return areas?.filter((area) =>
      area.departments.find((dept) => dept._id === selectedDepartmentId)
    );
  };

  //get related areas when a department is selected
  useEffect(() => {
    if (selectedDepartmentId !== null) {
      const relatedAreas = getRelatedAreasForDepartment(
        selectedDepartmentId,
        areas?.data
      );
      if (relatedAreas && relatedAreas.length > 0) {
        setRelatedEntities([
          {
            type: "areas",
            items: relatedAreas as Area[],
          },
        ]);
      } else {
        setRelatedEntities([]);
      }
    }
  }, [selectedDepartmentId, areas?.data]);

  const refetchData = async () => {
    await fetchDepartments();
    await refetchDeptPeopleStats();
  };

  return isError || isErrorAreas ? (
    <Text>An error has occurred</Text>
  ) : isLoading || isLoadingAreas ? (
    <LoadingSpinner message="Loading Departments..." />
  ) : (
    <GenericCRUD
      title="Departments"
      items={departmentsData?.data}
      columns={columns}
      entityType="departments"
      refetchData={refetchData}
      selectedId={selectedDepartmentId}
      setSelectedId={setSelectedDepartmentId}
      relatedEntities={relatedEntities}
    />
  );
};

export default DepartmentCRUD;
