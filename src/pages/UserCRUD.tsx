import React, { useEffect, useState } from "react";
import GenericCRUD from "../components/GenericCRUD";
import { Typography } from "antd";
import { getColumnsForm, getFiltersForColumns } from "../hooks/useColumnsForm";
import { User } from "../interfaces/entities";
import { RelatedEntity } from "../components/AlertModal";
import LoadingSpinner from "../components/LoadingSpinner";
import { useDataContext } from "../contexts/dataContext";

const { Text } = Typography;

let columns = getColumnsForm["users"] as any;

const UserCRUD: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const dataContext = useDataContext();
  const [relatedEntities, setRelatedEntities] = useState<RelatedEntity[]>([]);

  const { data: usersData, isLoading, isError, fetchUsers } = dataContext.users;
  if (!usersData) fetchUsers();

  //position levels are needed for rendering levels in the position column and in the edit/delete forms
  const {
    data: positionLevelsData,
    isLoading: isLoadingPositionLevels,
    isError: isErrorPositionLevels,
    fetchLevels,
  } = dataContext.positionLevels;
  if (!positionLevelsData) fetchLevels();

  //add filter search values to columns
  columns = getFiltersForColumns("users", columns, usersData);

  //get users supervised by selected user
  const getSupervisedEmployees = (selectedUserId: string | null) => {
    if (!selectedUserId) return [];

    const supervisedEmployees = usersData?.data.find(
      (user: User) => user._id == selectedUserId
    )?.supervisedEmployees;

    if (!supervisedEmployees) return [];
    return usersData?.data.filter((user: User) => {
      return supervisedEmployees.find((emp) => emp._id == user._id);
    }) as User[];
  };

  //when a user is selected or users data changes, get the employees supervised by that user selected
  useEffect(() => {
    if (selectedUserId !== null) {
      const employeesSupervisedByUser = getSupervisedEmployees(selectedUserId);
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
    }
  }, [selectedUserId, usersData?.data]);

  return isError || isErrorPositionLevels ? (
    <Text>An error has occurred</Text>
  ) : isLoading || isLoadingPositionLevels ? (
    <LoadingSpinner message="Loading Employees..." />
  ) : (
    <GenericCRUD
      title="Users"
      items={usersData?.data}
      columns={columns}
      entityType="users"
      refetchData={fetchUsers}
      selectedId={selectedUserId}
      setSelectedId={setSelectedUserId}
      relatedEntities={relatedEntities}
    />
  );
};

export default UserCRUD;
