import React, { useContext, useEffect, useState } from "react";
import LoggedOut from "./LoggedOut";
import LoggedIn from "./LoggedIn";
import { globalData } from "../../routes/AppRoutes";

const Profile = () => {

  const {userData,setUserData}=useContext(globalData);
  const isUserLoggedIn = userData && Object.keys(userData).length > 0;  
  return (
    <div className="d-flex w-100">
      {isUserLoggedIn ? <LoggedIn /> : <LoggedOut /> }
    </div>
  );
};

export default Profile;
