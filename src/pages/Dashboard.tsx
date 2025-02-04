import { Card } from "antd";
import { useAuth } from "../contexts/authContext";

export const Dashboard = () => {
  const { fullUser } = useAuth();

  return (
    <div>
      <h1>Welcome {fullUser?.firstName}</h1>
      {fullUser && (
        <Card title="User Details">
          <p>Email: {fullUser.email}</p>
          <p>Phone: {fullUser.phone}</p>
          <p>
            Position:{" "}
            {(fullUser.positionLevel ?? " ") + " " + fullUser.position?.title}
          </p>
        </Card>
      )}
    </div>
  );
};
