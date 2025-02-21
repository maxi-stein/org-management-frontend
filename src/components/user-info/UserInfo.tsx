import { getUser } from "../../apiServices/userService";
import { User } from "../../interfaces/entities";
import { useQuery } from "@tanstack/react-query";
import { StatisticsChart } from "../charts/StatisticsChart";
import { UserNameCard } from "./UserNameCard";
import { UserDetails } from "./UserDetails";
import { SupervisedEmployees } from "./SupervisedEmployees";

interface Props {
  displayUser: User;
}
export const UserInfo = ({ displayUser }: Props) => {
  const {
    data: employees = [],
    isError, //TODO: handle Error
    isLoading, //TODO: handle loading
  } = useQuery({
    queryKey: ["supervised-employees", displayUser?._id],
    queryFn: async () => {
      const employeesData = await Promise.all(
        displayUser.supervisedEmployees.map(async (employee) => {
          const response = await getUser(employee._id!);
          return response.data[0];
        })
      );
      return employeesData;
    },
    staleTime: 1000 * 60 * 60 * 4, //stale for 4hours
  });

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateRows: "0.7fr 0.3fr",
          gap: "16px",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr" }}>
          <div
            style={{
              display: "grid",
              gridTemplateRows: "1fr 2fr",
              gap: "16px",
            }}
          >
            <UserNameCard user={displayUser} />
            <UserDetails user={displayUser} />
          </div>

          <div
            style={{
              display: "flex",
              height: "500px",
              justifyContent: "space-around",
            }}
          >
            <StatisticsChart type="departments-people" />
            <StatisticsChart type="seniority-people" />
          </div>
        </div>
        <SupervisedEmployees employees={employees} />
      </div>
    </>
  );
};
