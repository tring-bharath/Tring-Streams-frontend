import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/SideBar/Sidebar";

const Home = () => {
  return (
    <div className="d-flex ">
      <Sidebar />
      <Outlet className="outlet position-absolute" />
    </div>
  );
};

export default Home;
