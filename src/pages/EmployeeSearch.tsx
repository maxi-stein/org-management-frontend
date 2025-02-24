import { SearchOutlined } from "@ant-design/icons";
import { AutoComplete, Card, Input, Typography, theme } from "antd";
import { useSearchUsers } from "../hooks/useSearchUsers";
import { useEffect, useState } from "react";
import { User } from "../interfaces/entities";
import { useTreeData } from "../hooks/useTreeData";
import { OrgChart } from "../components/charts/OrgChart";
import { SearchedUserInfo } from "../components/user-info/SearchedUserInfo";
import { useParams, useNavigate } from "react-router-dom";

const { useToken } = theme;
const { Title } = Typography;

export const EmployeeSearch = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { token } = useToken();
  const [searchedUser, setSearchedUser] = useState<User | null>(null);
  const { searchOptions, setSearchQuery, searchByUserId } = useSearchUsers({
    setSearchedUser,
  });
  const treeData = useTreeData();

  useEffect(() => {
    if (userId) {
      searchByUserId(userId);
    }
  }, [userId, searchByUserId]);

  // Modificar el AutoComplete para actualizar la URL
  const handleSearchSelect = (userId: string) => {
    navigate(`/employees/search/${userId}`);
  };

  return (
    <div style={{ padding: "24px", margin: "0 auto" }}>
      <Card
        style={{
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            marginBottom: "32px",
            justifyContent: "space-evenly",
          }}
        >
          <Title level={4} style={{ marginBottom: "0px" }}>
            Employee Search
          </Title>
          <AutoComplete
            options={searchOptions}
            onSearch={(value) => setSearchQuery(value)}
            onSelect={(value, option) => {
              handleSearchSelect(option.value);
            }}
            style={{ width: "80%" }}
          >
            <Input
              placeholder="Search an employee"
              size="large"
              style={{
                borderRadius: "8px",
                borderColor: token.colorBorder,
              }}
              prefix={
                <SearchOutlined
                  style={{
                    color: token.colorTextSecondary,
                    marginRight: "8px",
                  }}
                />
              }
            />
          </AutoComplete>
        </div>

        <hr style={{ border: "1px solid #f3f3f3" }} />

        {searchedUser && <SearchedUserInfo displayUser={searchedUser} />}
      </Card>

      {searchedUser && (
        <Card
          style={{
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <OrgChart data={treeData} userNodeId={searchedUser._id} />
        </Card>
      )}
    </div>
  );
};
