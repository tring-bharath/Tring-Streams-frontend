import React, { useContext } from "react";
import LoggedOut from "../../components/Auth/LoggedOut";
import LoggedIn from "../../components/Auth/Loggedin";
import { globalData } from "../../routes/AppRoutes";

const Profile = () => {
  const { userData, setUserData } = useContext(globalData);
  const isUserLoggedIn = userData && Object.keys(userData).length > 0;
  return (
    <div className="d-flex w-100">
      {isUserLoggedIn ? <LoggedIn /> : <LoggedOut />}
    </div>
  );
};

export default Profile;
