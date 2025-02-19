import { useState } from "react";
import { useDataContext } from "../contexts/dataContext";
import { Avatar } from "antd";
import { User } from "../interfaces/entities";

interface Props {
  setSearchedUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const useSearchUsers = ({ setSearchedUser }: Props) => {
  const { users } = useDataContext();
  const [searchQuery, setSearchQuery] = useState("");

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
        onClick={() => setSearchedUser(user)}
      >
        <Avatar
          size="small"
          style={{
            marginRight: 8,
            backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
              16
            )}`,
          }}
        >
          {user.firstName[0] + user.lastName[0]}
        </Avatar>
        <span>{`${user.firstName} ${user.lastName}`}</span>
      </div>
    ),
  }));

  return { searchOptions, setSearchQuery };
};
