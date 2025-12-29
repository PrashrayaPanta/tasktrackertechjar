import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <div className="max-w-[1440px] container mx-auto">
        <Header />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
