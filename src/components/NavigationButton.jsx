import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavigationButton = ({ label, icon, navigatedto }) => {
  console.log(label);

  const { pathname } = useLocation();

  return label === "Add" ? (
    <Link
      className="px-4 py-2 bg-black text-white flex gap-2 items-center"
      to={`http://localhost:5174${pathname}/${label?.toLowerCase()}`}
    >
      <i className={`fa-solid ${icon}`}></i>
      {label}
    </Link>
  ) : (
    <Link
      className="px-4 py-2 bg-black text-white flex gap-2 items-center"
      to={`http://localhost:5174${pathname}/${label?.toLowerCase()}/${navigatedto}`}
    >
      <i className={`fa-solid ${icon}`}></i>
      {label}
    </Link>
  );
};

export default NavigationButton;
