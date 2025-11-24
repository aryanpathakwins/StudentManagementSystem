import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const AppRoutes: React.FC = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4">
          <Outlet /> 
        </div>
      </div>
    </div>
  );
};

export default AppRoutes;
