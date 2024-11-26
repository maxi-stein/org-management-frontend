import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import SideNav from "./components/SideNav.tsx";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import RoleCRUD from "./pages/RoleCRUD.tsx";
import UserCRUD from "./pages/UserCRUD.tsx";
import PositionCRUD from "./pages/PositionCRUD.tsx";
import DepartmentCRUD from "./pages/DepartmentCRUD.tsx";
import AreaCRUD from "./pages/AreaCRUD.tsx";
import Dashboard from "./pages/Dashboard.tsx";

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <SideNav />
        <Layout>
          <Header />
          <Content style={{ margin: "24px 16px 0" }}>
            <div style={{ padding: 24, minHeight: 360 }}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/roles" element={<RoleCRUD />} />
                <Route path="/users" element={<UserCRUD />} />
                <Route path="/positions" element={<PositionCRUD />} />
                <Route path="/departments" element={<DepartmentCRUD />} />
                <Route path="/areas" element={<AreaCRUD />} />
              </Routes>
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;