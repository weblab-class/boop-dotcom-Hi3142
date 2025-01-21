import React, { useContext, useState, useEffect } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { get } from "../../utilities";
import { useParams } from "react-router-dom";

import "../../utilities.css";
import { UserContext } from "../App";
import "./Search.css";

const Profile = () => {
  const { handleLogin, handleLogout } = useContext(UserContext);
  let props = useParams();
  const userId = props.userId;
  console.log(userId);
  const [user, setUser] = useState();

  useEffect(() => {
    document.title = "Profile Page";
    console.log("fetch");
    get(`/api/profile`, { userId: userId }).then((userObj) => {
      setUser(userObj);
      console.log("fetch");
      console.log(userObj);
    });
  }, []);

  if (!user) {
    return <div> Loading!</div>;
  }
  return (
    <>
      <div>
        <h1>Hello, {user.name}!</h1>
      </div>
    </>
  );
};

export default Profile;
