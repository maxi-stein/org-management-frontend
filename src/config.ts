import { theme } from "antd";

const yellow = "#f6f930";
const green = "#d2f898";
const blue = "#3185fc";

export const customTheme = {
  token: {
    colorPrimary: blue, // AZURE BLUE
    colorSuccess: green, // PALE LIME
    colorWarning: yellow,
    colorError: "#ff4d4f", // red
    colorTextBase: "black", // main text
    colorBgBase: "#ffffff",
    borderRadius: 6,
    fontFamily: "'Inter', sans-serif",
    controlHeight: 36,
  },
  components: {
    Menu: {
      colorItemBgSelected: "#c3c429",
      colorItemTextSelected: "black",
      colorItemTextHover: "black",
      itemBg: yellow,
      itemColor: "#322e18",
      subMenuItemBg: "#e3e330",
    },
    Layout: {
      siderBg: yellow,
      triggerBg: blue, // collapse button background
      triggerColor: "black", //collapse icon
    },
    Table: {
      headerBg: blue,
      headerColor: "#322e18",
    },
    Card: {
      headerBg: yellow,
      colorBorderSecondary: green,
    },
  },
  algorithm: theme.defaultAlgorithm,
};
