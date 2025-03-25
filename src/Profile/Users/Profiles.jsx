import React, { useEffect, useState } from "react";
import LoggedOut from "./LoggedOut";
import LoggedIn from "./LoggedIn";

const Profile = () => {
  const user=JSON.parse(localStorage.getItem("user"));
  

  return (
    <div className="d-flex w-100">
      {user == null ? <LoggedOut /> : <LoggedIn />}
    </div>
  );
};

export default Profile;
