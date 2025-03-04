// UserProfile.tsx
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../apiServices/userService";
import { Dashboard } from "./Dashboard";
import LoadingSpinner from "../components/assets/LoadingSpinner";

export const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId!),
  });

  //TODO: Handle error

  const user = response?.data[0];

  if (isLoading) return <LoadingSpinner message="Loading user..." />;
  if (!user) return <div>User not found.</div>;

  return <Dashboard />;
};
