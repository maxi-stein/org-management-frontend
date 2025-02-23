import { User } from "../../interfaces/entities";
import { UserNameCard } from "./UserNameCard";
import { UserDetails } from "./UserDetails";
import { SupervisedEmployees } from "./SupervisedEmployees";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../apiServices/userService";

interface Props {
  displayUser: User;
}

export const SearchedUserInfo = ({ displayUser }: Props) => {
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
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        gap: "24px",
        padding: "24px",
      }}
    >
      {/* left column */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: "0.5fr 0.5fr",
          rowGap: "24px",
        }}
      >
        <UserNameCard user={displayUser} />
        <UserDetails user={displayUser} />
      </div>

      {/* right column */}
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <h3
          style={{
            margin: 0,
            color: "#1a1a1a",
            fontSize: "20px",
            fontWeight: 600,
            paddingBottom: "8px",
            borderBottom: "2px solid #ff4d4f",
          }}
        >
          Supervised Employees
        </h3>
        <SupervisedEmployees employees={employees} />
      </div>
    </div>
  );
};
