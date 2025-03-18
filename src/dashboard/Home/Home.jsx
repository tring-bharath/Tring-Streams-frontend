import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar/Sidebar";
import { ToastContainer } from "react-toastify";

const Home = () => {
  return (
    <div className="d-flex">
      <ToastContainer />
      <Sidebar/>
      <Outlet className="outlet position-absolute" />
    </div>
  );
};

export default Home;
