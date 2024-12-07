import React, { useEffect, useState } from "react";
import GenericCRUD from "../components/GenericCRUD";
import { Typography } from "antd";
import { getColumnsForm } from "../hooks/useColumnsForm";
import { User } from "../interfaces/entities";
import { RelatedEntity } from "../components/AlertModal";
import { useFetchEntity } from "../hooks/useFetchEntity";
import { useReletedEntities } from "../hooks/useReletedEntities";
import LoadingSpinner from "../components/LoadingSpinner";

const { Text } = Typography;

const columns = getColumnsForm["users"];

const UserCRUD: React.FC = () => {
  const [initialUsers, setInitialUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [relatedEntities, setRelatedEntities] = useState<RelatedEntity[]>([]);

  const { data: users, isLoading, isError, refetch } = useFetchEntity("users");

  useEffect(() => {
    if (users && !isLoading) {
      setInitialUsers(users.data as User[]);
    }
  }, [users]);

  const {
    data: employeesSupervisedByUser,
    refetch: refetchRelatedUsers,
    isLoading: isLoadingUsersRelated,
  } = useReletedEntities(selectedUserId, "users");

  useEffect(() => {
    if (selectedUserId !== null) {
      refetchRelatedUsers();
    }
  }, [selectedUserId]);

  useEffect(() => {
    if (employeesSupervisedByUser && employeesSupervisedByUser.length > 0) {
      const employeesSupervisedByUserArray =
        employeesSupervisedByUser as User[];
      setRelatedEntities([
        {
          type: "users",
          items: employeesSupervisedByUserArray.map((u) => {
            return { name: u.firstName + " " + u.lastName };
          }),
        },
      ]);
    } else {
      setRelatedEntities([]);
    }
  }, [employeesSupervisedByUser]);

  return isError ? (
    <Text>An error has occurred</Text>
  ) : isLoading || isLoadingUsersRelated ? (
    <LoadingSpinner message="Loading Employees..." />
  ) : (
    <GenericCRUD
      title="Users"
      items={initialUsers}
      columns={columns}
      entityType="users"
      additionalFormData={undefined}
      refetchData={refetch}
      selectedId={selectedUserId}
      setSelectedId={setSelectedUserId}
      relatedEntities={relatedEntities}
    />
  );
};

export default UserCRUD;
