import React from "react";
import Loggedout from "./Loggedout";
import Loggedin from "./Loggedin";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="d-flex w-100">
      {user == null ? <Loggedout /> : <Loggedin />}
    </div>
  );
};

export default Profile;
