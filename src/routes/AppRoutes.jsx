import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/VideoPlayer/Home";
import Landingpage from "../pages/Auth/LandingPage/Landingpage";
import Search from "../pages/VideoPlayer/Search";
import Watchlist from "../pages/VideoPlayer/Watchlist";
import Login from "../pages/Auth/Login";
import Profile from "../pages/Auth/Profiles";
import Signup from "../pages/Auth/Signup";
import Dashboard from "../pages/VideoPlayer/Dashboard/Dashboard";
import Videopreview from "../components/VideoPreview/Videopreview";
import ForgotPassword from "../components/Auth/ForgotPassword";
import ResetPassword from "../components/Auth/ResetPassword";

export const globalData = createContext();
const AppRoutes = () => {
  const [userData, setUserData] = useState({});

  return (
    <globalData.Provider value={{ userData, setUserData }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="Search" element={<Search />} />
            <Route path="WatchList" element={<Watchlist />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/videoPlayer" element={<Videopreview />} />
          <Route path="/registration" element={<Landingpage />}>
            <Route path="" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </globalData.Provider>
  );
};

export default AppRoutes;
