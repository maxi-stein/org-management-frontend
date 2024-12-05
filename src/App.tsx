import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import SideNav from "./components/SideNav.tsx";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import UserCRUD from "./pages/UserCRUD.tsx";
import PositionCRUD from "./pages/PositionCRUD.tsx";
import DepartmentCRUD from "./pages/DepartmentCRUD.tsx";
import AreaCRUD from "./pages/AreaCRUD.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const { Content } = Layout;
const queryClient = new QueryClient();

const routes = [
  { path: "/", element: <Dashboard />, exact: true },
  { path: "/users", element: <UserCRUD /> },
  { path: "/positions", element: <PositionCRUD /> },
  { path: "/departments", element: <DepartmentCRUD /> },
  { path: "/areas", element: <AreaCRUD /> },
];

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};

export default App;
