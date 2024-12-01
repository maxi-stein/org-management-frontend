import React, { useEffect, useState } from "react";
import GenericCRUD from "../components/GenericCRUD";
import { Area, Department } from "../interfaces/entities";
import { useFetchEntity } from "../hooks/useFetchEntity";
import { useReletedEntities } from "../hooks/useReletedEntities";
import { Typography } from "antd";
import { RelatedEntity } from "../components/AlertModal";

const columns = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Description", dataIndex: "description", key: "description" },
  { title: "Head of Department", dataIndex: "head", key: "head" },
];

const { Text } = Typography;

const DepartmentCRUD: React.FC = () => {
  const [initialDepartments, seInitialDepartments] = useState<Department[]>([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<
    string | null
  >(null);
  const [relatedEntities, setRelatedEntities] = useState<RelatedEntity[]>([]);
  const {
    data: departments,
    isLoading,
    isError,
    refetch,
  } = useFetchEntity("departments");

  const { data: relatedAreas, refetch: refetchRelatedAreas } =
    useReletedEntities(selectedDepartmentId || null, "departments");

  useEffect(() => {
    if (departments && !isLoading) {
      seInitialDepartments(departments.data as Department[]);
    }
  }, [departments]);

  //get related areas when a department is selected
  useEffect(() => {
    refetchRelatedAreas();
  }, [selectedDepartmentId]);

  //after selected id changed, relatedAreas is refetched so the relatedEntities are updated
  useEffect(() => {
    // Check if there are areas associated with this department
    if (relatedAreas && relatedAreas.length > 0) {
      setRelatedEntities([
        {
          type: "areas", // Type of related entity
          items: relatedAreas as Area[], // Areas associated with the department
        },
      ]);
    } else {
      setRelatedEntities([]);
    }
  }, [relatedAreas]);

  return isError ? (
    <Text>An error has occurred</Text>
  ) : (
    <GenericCRUD
      title="Departments"
      items={initialDepartments}
      columns={columns}
      isLoading={isLoading}
      entityType="departments"
      refetchData={refetch}
      selectedId={selectedDepartmentId}
      setSelectedId={setSelectedDepartmentId}
      relatedEntities={relatedEntities}
    />
  );
};

export default DepartmentCRUD;
