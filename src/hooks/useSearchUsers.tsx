import { useCallback, useEffect, useState } from "react";
import { useDataContext } from "../contexts/dataContext";
import { Avatar } from "antd";
import { User } from "../interfaces/entities";
import { getUser } from "../apiServices/userService";

interface Props {
  setSearchedUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const useSearchUsers = ({ setSearchedUser }: Props) => {
  const { users } = useDataContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOptions, setSearchOptions] = useState<
    {
      value: string;
      label: JSX.Element;
    }[]
  >();

  const { data, fetchUsers } = users;
  if (!data) {
    fetchUsers();
  }

  useEffect(() => {
    const filteredUsers =
      users.data?.data.filter((user) =>
        `${user.firstName} ${user.lastName}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      ) || [];

    const newSearchOptions = filteredUsers.map((user) => ({
      value: `${user._id}`,
      label: (
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => setSearchedUser(user)}
        >
          <Avatar
            size="small"
            style={{
              marginRight: 8,
              backgroundColor: `#${Math.floor(
                Math.random() * 16777215
              ).toString(16)}`,
            }}
          >
            {user.firstName[0] + user.lastName[0]}
          </Avatar>
          <span>{`${user.firstName} ${user.lastName}`}</span>
        </div>
      ),
    }));

    setSearchOptions(newSearchOptions);
  }, [searchQuery]);

  const searchByUserId = useCallback(
    async (userId: string) => {
      try {
        const response = await getUser(userId);
        setSearchedUser(response.data[0]);
      } catch (error) {
        console.error("Error fetching user:", error);
        setSearchedUser(null);
      }
    },
    [setSearchedUser]
  );

  return { searchOptions, setSearchQuery, searchByUserId };
};
