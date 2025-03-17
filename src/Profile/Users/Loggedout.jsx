import React from "react";
import { useNavigate } from "react-router-dom";

const Loggedout = () => {
  const navigate = useNavigate();

  const loginNavigate = () => {
    navigate("/registration");
  };

  return (
    <div className="d-flex flex-column justify-content-center align-self-center align-items-center w-100">
      <h3>You are not logged in</h3>
      <div className="">
        <button
          className="h6 border-0 px-3 py-2 rounded bg-primary text-white"
          onClick={loginNavigate}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Loggedout;
