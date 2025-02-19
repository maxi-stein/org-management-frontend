import { OrgChart } from "../components/OrgChart";

import { useAuth } from "../contexts/authContext";
import { useTreeData } from "../hooks/useTreeData";

const OrgChartPage: React.FC = () => {
  const { fullUser } = useAuth();

  const treeData = useTreeData();

  return (
    <div>
      <OrgChart data={treeData} userNodeId={fullUser?._id} />
    </div>
  );
};

export default OrgChartPage;
