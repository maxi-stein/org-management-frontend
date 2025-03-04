import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Layout, App as AntdApp } from "antd";
import SideNav from "./components/layout/SideNav.tsx";
import Header from "./components/layout/Header.tsx";
import Footer from "./components/layout/Footer.tsx";
import UserCRUD from "./pages/UserCRUD.tsx";
import PositionCRUD from "./pages/PositionCRUD.tsx";
import DepartmentCRUD from "./pages/DepartmentCRUD.tsx";
import AreaCRUD from "./pages/AreaCRUD.tsx";
import { Dashboard } from "./pages/Dashboard.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import OrgChartPage from "./pages/OrgChartPage";
import { DataProvider } from "./contexts/dataContext.tsx";
import { ConfigProvider } from "antd";
import Login from "./pages/Login.tsx";
import ProtectedRoute from "./components/layout/ProtectedRoute.tsx";
import { AuthProvider } from "./contexts/authContext.tsx";
import { customTheme } from "./theme/theme.ts";
import { EmployeeSearch } from "./pages/EmployeeSearch.tsx";

const { Content } = Layout;
const queryClient = new QueryClient();

const AuthenticatedLayout: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideNav />
      <Layout>
        <Header />
        <Content>
          <div style={{ padding: 24, minHeight: 360 }}>
            <Outlet />
          </div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <DataProvider>
          <ConfigProvider theme={customTheme}>
            <AntdApp>
              <Router>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route
                    element={
                      <ProtectedRoute allowedRoles={["admin", "employee"]} />
                    }
                  >
                    <Route element={<AuthenticatedLayout />}>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/org-chart" element={<OrgChartPage />} />
                      <Route
                        path="/employees/search/:userId?"
                        element={<EmployeeSearch />}
                      />

                      <Route
                        element={<ProtectedRoute allowedRoles={["admin"]} />}
                      >
                        <Route path="/users" element={<UserCRUD />} />
                        <Route path="/positions" element={<PositionCRUD />} />
                        <Route
                          path="/departments"
                          element={<DepartmentCRUD />}
                        />
                        <Route path="/areas" element={<AreaCRUD />} />
                      </Route>
                    </Route>
                  </Route>

                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Router>
            </AntdApp>
          </ConfigProvider>
        </DataProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
