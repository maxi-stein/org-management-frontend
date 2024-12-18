import React, { useCallback, useEffect, useState } from "react";
import { message, Typography } from "antd";
import { OrgChart } from "../components/OrgChart";
import { useDataContext } from "../contexts/dataContext";
import { Card, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { User } from "../interfaces/entities";
import { getUser } from "../apiServices/userService";
import { bffResponse } from "../apiServices/http-config";

const OrgChartPage: React.FC = () => {
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

  const fetchDetailedUserData = useCallback(
    async (userId: string): Promise<bffResponse<User[]>> => {
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
    },
    []
  );

  useEffect(() => {
    if (users && !isLoadingUsers) {
      const headsOfDept = users.data.filter(
        (user) => user.position?.title === "Head Of Department"
      );

      // Fetch detailed data for each Head of Department
      const fetchDetailedHeads = async () => {
        const detailedHeads = await Promise.all(
          headsOfDept.map((head) => fetchDetailedUserData(head._id ?? ""))
        );
        setDetailedHeadOfDepartments(
          detailedHeads.flatMap((head) => head.data)
        );
      };
      fetchDetailedHeads();
    }
  }, [users, isLoadingUsers, fetchDetailedUserData]);

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
        title: `${user.position?.level} ${user.position?.title}`,
      },
      children:
        user.supervisedEmployees?.map((subordinate: any) =>
          createTreeData(subordinate)
        ) || [],
    };
  };

  return (
    <div>
      <Card
        style={{
          marginBottom: "20px",
          backgroundColor: "#f8f1f1",
          boxShadow: "0 4px 6px rgba(253, 0, 0, 0.1)",
          borderRadius: "8px",
          width: "30%",
          marginInline: "auto",
          textAlign: "center",
        }}
      >
        {ceo ? (
          <>
            <Typography.Title level={3} style={{ marginBottom: "15px" }}>
              {`${ceo.firstName} ${ceo.lastName}`}
            </Typography.Title>
          </>
        ) : (
          <Typography.Text type="secondary">CEO not found.</Typography.Text>
        )}

        {ceo?.position && (
          <Tag color="red" icon={<UserOutlined />} style={{ borderRadius: 20 }}>
            {ceo.position.title}
          </Tag>
        )}
      </Card>

      <div>
        <OrgChart
          data={[
            {
              name: "Company",
              children: areas?.data.map((area) => createAreaNode(area)) || [],
            },
          ]}
        />
      </div>
    </div>
  );
};

export default OrgChartPage;
