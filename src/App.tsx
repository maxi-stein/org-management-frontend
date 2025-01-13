import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout, App as AntdApp } from "antd";
import SideNav from "./components/SideNav.tsx";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import UserCRUD from "./pages/UserCRUD.tsx";
import PositionCRUD from "./pages/PositionCRUD.tsx";
import DepartmentCRUD from "./pages/DepartmentCRUD.tsx";
import AreaCRUD from "./pages/AreaCRUD.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import OrgChartPage from "./pages/OrgChartPage";
import { DataProvider } from "./contexts/dataContext.tsx";
import { ConfigProvider } from "antd";

const { Content } = Layout;
const queryClient = new QueryClient();

const routes = [
  { path: "/", element: <Dashboard /> },
  { path: "/users", element: <UserCRUD /> },
  { path: "/positions", element: <PositionCRUD /> },
  { path: "/departments", element: <DepartmentCRUD /> },
  { path: "/areas", element: <AreaCRUD /> },
  { path: "/org-chart", element: <OrgChartPage /> },
];

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <DataProvider>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: "Roboto",
              colorPrimary: "#2f97d3",
            },
          }}
        >
          <AntdApp>
            <Router>
              <Layout style={{ minHeight: "100vh" }}>
                <SideNav />
                <Layout>
                  <Header />
                  <Content style={{ margin: "24px 16px 0" }}>
                    <div style={{ padding: 24, minHeight: 360 }}>
                      <Routes>
                        {routes.map((route, index) => (
                          <Route
                            key={index}
                            path={route.path}
                            element={route.element}
                          />
                        ))}
                      </Routes>
                    </div>
                  </Content>
                  <Footer />
                </Layout>
              </Layout>
            </Router>
          </AntdApp>
        </ConfigProvider>
      </DataProvider>
    </QueryClientProvider>
  );
};

export default App;
