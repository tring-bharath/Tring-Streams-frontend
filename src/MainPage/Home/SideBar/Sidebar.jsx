import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaBookmark, FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css";
import { ToastContainer } from "react-toastify";
import { useQuery } from "@apollo/client";
import { getUser } from "../../../graphql/query";
import { globalData } from "../../../routes/AppRoutes";

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname === path;
  };
    const {data:handleGetUserData}=useQuery(getUser,{fetchPolicy:"no-cache"})
    const {userData,setUserData}=useContext(globalData);
  
    useEffect(() => {
      if (handleGetUserData && handleGetUserData.getUserData) {
        setUserData(handleGetUserData.getUserData);
      }
    }, [handleGetUserData]);

  return (
    <div className="sidebar p-3 d-flex flex-column justify-content-center gap-4">
      <ToastContainer />
      <Link
        to="/"
        className={`sidebar-link d-flex align-items-center py-3 px-2 rounded text-decoration-none ${
          isActive("/") ? "active" : ""
        }`}>
        <FaHome size={24} className=" sidebar-icons" />
        <h5 className="mb-0 sidebar-items">Home</h5>
      </Link>

      <Link
        to="/search"
        className={`sidebar-link d-flex align-items-center py-3 px-2 rounded text-decoration-none ${
          isActive("/search") ? "active" : ""
        }`}>
        <FaSearch size={24} className=" sidebar-icons" />
        <h5 className="mb-0 sidebar-items">Search</h5>
      </Link>

      <Link
        to="/watchlist"
        className={`sidebar-link d-flex align-items-center py-3 px-2 rounded text-decoration-none ${
          isActive("/watchlist") ? "active" : ""
        }`}>
        <FaBookmark size={24} className=" sidebar-icons" />
        <h5 className="mb-0 sidebar-items">Watch List</h5>
      </Link>

      <Link
        to="/profile"
        className={`sidebar-link d-flex align-items-center py-3 px-2 rounded text-decoration-none ${
          isActive("/profile") ? "active" : ""
        }`}>
        <CgProfile size={24} className=" sidebar-icons" />
        <h5 className="username sidebar-items d-flex align-self-center">
          {userData?.firstName == null ? "Profile" : userData?.firstName}
        </h5>
      </Link>
    </div>
  );
};

export default Sidebar;
