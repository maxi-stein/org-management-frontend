import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "../components/user-info/UserInfo";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { fullUser } = useAuth();

  if (fullUser === null) {
    navigate("/login");
    return null;
  }

  return <UserInfo displayUser={fullUser} />;
};
