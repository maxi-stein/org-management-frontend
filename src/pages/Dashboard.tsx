import React from "react";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const OrgChart: React.FC = () => {
  return (
    <div>
      <Title level={2}>Welcome to the Organization Chart Manager</Title>
      <Paragraph>
        This dashboard provides an overview of your organization's structure.
        Use the navigation menu to manage users, positions, departments, and
        areas.
      </Paragraph>
    </div>
  );
};

export default OrgChart;
