import { theme } from "antd";

const lightBlue = "#99caff";
const green = "#d2f898";
const blue = "#3185fc";

export const customTheme = {
  token: {
    colorPrimary: blue, // AZURE BLUE
    colorSuccess: green, // PALE LIME
    colorWarning: lightBlue,
    colorError: "#ff4d4f", // red
    colorTextBase: "black", // main text
    colorBgBase: "#ffffff",
    borderRadius: 6,
    fontFamily: "'Inter', sans-serif",
    controlHeight: 36,
  },
  components: {
    Menu: {
      colorItemBgSelected: blue,
      colorItemTextSelected: "black",
      colorItemTextHover: "black",
      itemBg: lightBlue,
      itemColor: "black",
      subMenuItemBg: "#6db0f7",
      itemBorderRadius: 20,
    },
    Layout: {
      siderBg: lightBlue,
      triggerBg: blue, // collapse button background
      triggerColor: "black", //collapse icon
    },
    Table: {
      headerBg: blue,
      headerColor: "black",
    },
    Card: {
      headerBg: lightBlue,
    },
    Button: {
      primaryBg: blue,
    },
  },
  algorithm: theme.defaultAlgorithm,
};
