import React, { useEffect, useState } from "react";
import GenericCRUD from "../components/GenericCRUD";
import { Area, Department, User } from "../interfaces/entities";
import { useFetchEntity } from "../hooks/useFetchEntity";
import { useReletedEntities } from "../hooks/useReletedEntities";
import { Typography } from "antd";
import { RelatedEntity } from "../components/AlertModal";
import { ExclamationCircleFilled } from "@ant-design/icons";
import LoadingSpinner from "../components/LoadingSpinner";

const { Text } = Typography;

const columns = [
  { title: "Name", dataIndex: "name", key: "name" },
  {
    title: "Head of Department",
    dataIndex: "head",
    key: "head",
    render: (head: User | null) =>
      head ? (
        <Text>{`${head.lastName}, ${head.firstName}`}</Text>
      ) : (
        <Text style={{ color: "#d9534f" }}>
          <ExclamationCircleFilled /> No Head of Department Assigned
        </Text>
      ),
  },
  { title: "Description", dataIndex: "description", key: "description" },
];

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

  const {
    data: relatedAreas,
    refetch: refetchRelatedAreas,
    isLoading: isLoadingRelatedDepartments,
  } = useReletedEntities(selectedDepartmentId, "departments");

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
  ) : isLoading || isLoadingRelatedDepartments ? (
    <LoadingSpinner message="Loading Departments..." />
  ) : (
    <GenericCRUD
      title="Departments"
      items={initialDepartments}
      columns={columns}
      entityType="departments"
      additionalFormData={{
        departments: initialDepartments,
      }}
      refetchData={refetch}
      selectedId={selectedDepartmentId}
      setSelectedId={setSelectedDepartmentId}
      relatedEntities={relatedEntities}
    />
  );
};

export default DepartmentCRUD;
