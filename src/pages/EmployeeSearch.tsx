import { SearchOutlined } from "@ant-design/icons";
import { AutoComplete, Card, Input, Typography } from "antd";
import { useSearchUsers } from "../hooks/useSearchUsers";
import { useState } from "react";
import { User } from "../interfaces/entities";
import { UserInfo } from "../components/UserInfo";
import { useTreeData } from "../hooks/useTreeData";
import { OrgChart } from "../components/charts/OrgChart";

export const EmployeeSearch = () => {
  const { Text } = Typography;
  const [searchedUser, setSearchedUser] = useState<User | null>(null);
  const { searchOptions, setSearchQuery } = useSearchUsers({ setSearchedUser });
  const treeData = useTreeData();

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginBottom: "32px",
        }}
      >
        <Text style={{ display: "flex", alignItems: "center" }}>
          Search for an employee
        </Text>
        <AutoComplete
          options={searchOptions}
          onSearch={(value) => setSearchQuery(value)}
          onSelect={(_, option) => option.label.props.onClick()}
          style={{ width: "80%" }}
        >
          <Input prefix={<SearchOutlined />} />
        </AutoComplete>
      </div>

      <div style={{ marginBottom: "16px" }}>
        {searchedUser && <UserInfo displayUser={searchedUser} />}
      </div>

      {searchedUser && (
        <OrgChart data={treeData} userNodeId={searchedUser._id} />
      )}
    </div>
  );
};
