import React from "react";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const OrgChart: React.FC = () => {
  return (
    <div>
      <Title level={2}>Work in progress</Title>
      <Paragraph>You will see here your personal information.</Paragraph>
    </div>
  );
};

export default OrgChart;
