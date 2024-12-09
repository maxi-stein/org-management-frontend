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
        console.log("Obtuve: ", response.data);
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
        console.log(detailedHeads);
      };
      fetchDetailedHeads();
    }
  }, [users, isLoadingUsers, fetchDetailedUserData]);

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
        {areas?.data.map((area) => (
          <Card
            key={area.name}
            title={
              <Typography.Title level={4} style={{ margin: 0 }}>
                {`${area.name} Area`}
              </Typography.Title>
            }
            bordered={false}
            style={{
              marginBottom: "20px",
              backgroundColor: "#f7f5fc",
              boxShadow: "0 4px 6px rgba(0, 59, 253, 0.534)",
              borderRadius: "8px",
            }}
          >
            {area.departments.map((department) => (
              <Card
                key={department._id}
                title={
                  <Typography.Text strong>
                    {`${department.name} Department`}
                  </Typography.Text>
                }
                bordered={false}
                style={{
                  marginBottom: "15px",
                  backgroundColor: "#fafafa",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                }}
              >
                {detailedHeadOfDepartments.find(
                  (head) => head._id === department.head._id
                ) ? (
                  <OrgChart
                    data={[
                      {
                        name:
                          department.head.firstName +
                          " " +
                          department.head.lastName,
                        attributes: {
                          title:
                            detailedHeadOfDepartments.find(
                              (head) => head._id === department.head._id
                            )?.position?.title ?? "No head of department",
                        },
                        children: detailedHeadOfDepartments
                          .find((head) => head._id === department.head._id)
                          ?.supervisedEmployees.map((user) => {
                            return {
                              name: user.firstName + " " + user.lastName,
                              attributes: {
                                title:
                                  user.position?.level +
                                  " " +
                                  user.position?.title,
                              },
                            };
                          }) ?? [{ name: "No data" }],
                      },
                    ]}
                  />
                ) : null}
              </Card>
            ))}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrgChartPage;
