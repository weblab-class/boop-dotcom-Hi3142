import React, { useContext, useState, useEffect } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { get } from "../../utilities";
import { useParams } from "react-router-dom";

import "../../utilities.css";
import { UserContext } from "../App";
import MenuItemDisplay from "../modules/menuitemdisplay.jsx";
import Menu from "../modules/menu.jsx";
import "./Search.css";

const Profile = () => {
  const { handleLogin, handleLogout } = useContext(UserContext);
  let props = useParams();
  const userId = props.userId;
  console.log(userId);
  const [user, setUser] = useState();

  useEffect(() => {
    document.title = "Profile Page";
    get(`/api/profile`, { userId: userId }).then((userObj) => {
      setUser(userObj);
    });
  }, []);

  return (
    <>
      {userId ? (
        <button
          onClick={() => {
            googleLogout();
            handleLogout();
          }}
        >
          Logout
        </button>
      ) : (
        <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
      )}
      <div>
        <h1>Hello, {user.name} !</h1>
      </div>
    </>
  );
};

export default Profile;
