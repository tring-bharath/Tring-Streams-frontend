import React, { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar/Sidebar";

export const globalData=createContext();

const Home = () => {
  
  const [userData,setUserData]=useState({});
  return (
    <div className="d-flex">
      <globalData.Provider value={{userData,setUserData}}>
      <Sidebar/>
      <Outlet className="outlet position-absolute" />
      </globalData.Provider>
    </div>
  );
};

export default Home;
