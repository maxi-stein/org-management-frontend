import React from "react";
import { Layout } from "antd";

const { Footer: AntFooter } = Layout;

const Footer: React.FC = () => {
  return (
    <AntFooter style={{ textAlign: "center" }}>
      Organization Chart Manager ©{new Date().getFullYear()} Created by
      Maximiliano Stein
    </AntFooter>
  );
};

export default Footer;
