import { ThemeConfig } from "antd";

export const customTheme: ThemeConfig = {
  components: {
    Menu: {
      darkItemBg: "#000000f9",
      darkSubMenuItemBg: "#2525253d",
      darkItemColor: "#ffffffe6",
      darkItemSelectedBg: "#ff4d4f",
    },
    Button: {
      colorPrimary: "#ff4d4f",
      colorPrimaryHover: "#cf1322",
      colorPrimaryActive: "#a8071a",
    },
    Card: {
      colorBgContainer: "#ffffff",
      borderRadiusLG: 16,
      boxShadowSecondary: "0 4px 12px rgba(0,0,0,0.08)",
    },
    Layout: {
      siderBg: "#000000f9",
    },
  },
};
