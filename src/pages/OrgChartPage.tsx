import React, { useEffect, useState } from "react";
import { message } from "antd";
import { OrgChart } from "../components/OrgChart";
import { useDataContext } from "../contexts/dataContext";
import { User } from "../interfaces/entities";
import { getUser } from "../apiServices/userService";
import { bffResponse } from "../apiServices/http-config";
import { useAuth } from "../contexts/authContext";

const OrgChartPage: React.FC = () => {
  const { fullUser } = useAuth();

  const {
    data: users,
    fetchUsers,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
  } = useDataContext().users;
  if (!users) fetchUsers();

  const {
    data: departments,
    fetchDepartments,
    isLoading: isLoadingDepartments,
    isError: isErrorDepartments,
  } = useDataContext().departments;
  if (!departments) fetchDepartments();

  const {
    data: areas,
    fetchAreas,
    isLoading: isLoadingAreas,
    isError: isErrorAreas,
  } = useDataContext().areas;
  if (!areas) fetchAreas();

  const ceo = users?.data.find((user) => user.position?.title === "CEO");
  const [detailedHeadOfDepartments, setDetailedHeadOfDepartments] = useState<
    User[]
  >([]);

  //used to fetch detailed Head of Department data
  const fetchDetailedUserData = async (
    userId: string
  ): Promise<bffResponse<User[]>> => {
    try {
      const response = await getUser(userId);
      if (!response.success) {
        console.error("Failed to fetch user data");
        return { data: [], success: false };
      }
      return response;
    } catch (error) {
      console.error("Error fetching user data:", error);
      message.error("Failed to fetch user data");
      return { data: [], success: false };
    }
  };

  // Fetch detailed data for each Head of Department
  const fetchDetailedHeads = async (headsOfDept: User[]) => {
    const detailedHeads = await Promise.all(
      headsOfDept.map((head) => fetchDetailedUserData(head._id ?? ""))
    );
    setDetailedHeadOfDepartments(detailedHeads.flatMap((head) => head.data));
  };

  useEffect(() => {
    if (users && !isLoadingUsers) {
      const headsOfDept = users.data.filter(
        (user) => user.position?.title === "Head Of Department"
      );
      if (headsOfDept.length > 0) fetchDetailedHeads(headsOfDept);
    }
  }, [users, isLoadingUsers]);

  const createAreaNode = (area: any) => {
    return {
      name: area.name + " Area",
      children: area.departments.map((department: any) =>
        createDepartmentNode(department)
      ),
    };
  };

  const createDepartmentNode = (department: any) => {
    return {
      name: department.name + " Department",
      children: detailedHeadOfDepartments
        .filter((head) => head._id === department.head._id)
        .map((head) => {
          return {
            name: head.firstName + " " + head.lastName,
            attributes: {
              title: head.position?.title ?? "No head of department",
              userId: head._id,
            },
            children: head.supervisedEmployees?.map(createTreeData) ?? [
              { name: "No data" },
            ],
          };
        }),
    };
  };

  const createTreeData = (user: any) => {
    return {
      name: user.firstName + " " + user.lastName,
      attributes: {
        title: `${user?.positionLevel} ${user.position?.title}`,
        userId: user._id,
      },
      children:
        user.supervisedEmployees?.map((subordinate: any) =>
          createTreeData(subordinate)
        ) || [],
    };
  };

  const treeData = [
    {
      name: ceo ? `${ceo.firstName} ${ceo.lastName} (CEO)` : "CEO",
      attributes: { userId: ceo?._id || "" },
      children: areas?.data.map((area) => createAreaNode(area)) || [],
    },
  ];

  return (
    <div>
      <OrgChart data={treeData} userNodeId={fullUser?._id} />
    </div>
  );
};

export default OrgChartPage;
