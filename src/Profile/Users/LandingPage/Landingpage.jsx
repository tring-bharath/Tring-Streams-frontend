import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./LandingPage.css";
import { ToastContainer } from "react-toastify";

const Landingpage = () => {
  const [active, setActive] = useState(0);
  const nav = useNavigate();
  const location = useLocation();

  const login = () => {
    nav("/registration");
    setActive(0);
  };

  const signup = () => {
    nav("/registration/signup");
    setActive(1);
  };

  useEffect(() => {
    if (location.pathname === "/Registration") {
      setActive(0);
    } else if (location.pathname === "/registration/signup") {
      setActive(1);
    }
  }, [location.pathname]);

  return (
    <div className="registerContainer bg-white d-flex">
      <ToastContainer />
      <div className="Container ">
        <div className="formContainer shadow-lg ">
          <div className="registerButton d-flex justify-content-center align-items-center">
            <button
              onClick={() => login()}
              className={`px-3 login py-2 ${active == 0 ? "active" : ""}`}>
              Login
            </button>
            <button
              onClick={() => signup()}
              className={`px-3 signup py-2 ${active == 1 ? "active" : ""}`}>
              SignUp
            </button>
          </div>
          <div className="outlet align-items-center align-self-center">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="sideImage-container col-6 d-none d-md-block"></div>
    </div>
  );
};

export default Landingpage;
