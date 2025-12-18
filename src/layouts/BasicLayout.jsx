import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const BasicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex flex-1 overflow-auto pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default BasicLayout;
