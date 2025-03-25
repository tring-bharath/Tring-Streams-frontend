import React from "react";
import LoggedOut from "./LoggedOut";
import LoggedIn from "./LoggedIn";

const Profile = () => {
  const user = (localStorage.getItem("token"));

  return (
    <div className="d-flex w-100">
      {user == null ? <LoggedOut /> : <LoggedIn />}
    </div>
  );
};

export default Profile;
