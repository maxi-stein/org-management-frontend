import { Button } from "antd";
import styled from "styled-components";

export const LoginButton = styled(Button)`
  height: 48;
  border-radius: 8;
  font-weight: 600;
  background-color: "#ff4d4f";
  border-color: "#ff4d4f";
  font-size: 16;
  transition: "all 0.2s";
  &:hover {
    background-color: "#851212";
  }
`;
