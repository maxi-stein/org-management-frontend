import { useState } from "react";
import { useDataContext } from "../contexts/dataContext";
import { useNavigate } from "react-router-dom";
import { Avatar } from "antd";

export const useSearchUsers = () => {
  const { users } = useDataContext();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const { data, fetchUsers } = users;
  if (!data) {
    fetchUsers();
  }

  const filteredUsers =
    users.data?.data.filter((user) =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    ) || [];

  const searchOptions = filteredUsers.map((user) => ({
    value: `${user.firstName} ${user.lastName}`,
    label: (
      <div
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={() => navigate(`/${user._id}`)}
      >
        <Avatar
          size="small"
          src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`}
          style={{ marginRight: 8 }}
        />
        <span>{`${user.firstName} ${user.lastName}`}</span>
      </div>
    ),
  }));

  return { searchOptions, setSearchQuery };
};
