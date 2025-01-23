import React, { useContext, useState, useEffect } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { get, post } from "../../utilities";
import { useParams } from "react-router-dom";

import "../../utilities.css";
import { UserContext } from "../App";
import "./Profile.css";
import Checkbox from "../modules/checkbox";

const Profile = () => {
  const { userId } = useContext(UserContext);
  let props = useParams();
  const [user, setUser] = useState();
  const [userDietaryFlags, setUserDietaryFlags] = useState([]);

  useEffect(() => {
    document.title = "Profile Page - Bone Apple Tea!";
    console.log("fetch");
    if (userId) {
      get(`/api/profile`, { userId: userId }).then((userObj) => {
        console.log(userId);
        setUser(userObj);
        console.log("fetch");
        console.log(userObj);
      });
      get(`/api/dietary-flags`, { userId: userId }).then((returnedFlags) => {
        setUserDietaryFlags(returnedFlags);
      });
    } else {
      setUser(undefined);
      setUserDietaryFlags([]);
    }
  }, [userId]);

  useEffect(() => {
    console.log(userDietaryFlags);
  }, [userDietaryFlags]);

  const toggleDietaryFlag = (flag) => () => {
    console.log("wheee");
    if (userDietaryFlags.includes(flag)) {
      post("/api/remove-dietary-flag", { item: flag }).then((res) => {
        setUserDietaryFlags(res.dietary_flags);
        console.log(res);
      });
    } else {
      console.log("aieee");
      post("/api/add-dietary-flag", { item: flag }).then((res) => {
        setUserDietaryFlags(res.dietary_flags);
        console.log(res);
      });
    }
  };

  const buttons = [
    {
      name: "Vegetarian",
      flag: "Vegetarian",
    },
    {
      name: "Vegan",
      flag: "Vegan",
    },
    {
      name: "Kosher",
      flag: "Kosher",
    },
  ];

  return (
    <>
      {user ? (
        <div className="profile-wrapper">
          <h1>Hello, {user.name}!</h1>
          <p>Manage your dietary flags:</p>
          {buttons.map((button) => (
            <div>
              <Checkbox
                label={button.name}
                value={userDietaryFlags.includes(button.flag)}
                onChange={toggleDietaryFlag(button.flag)}
              />
            </div>
          ))}
          <p>Manage favorites</p>
        </div>
      ) : (
        <div> Please sign in!</div>
      )}
    </>
  );
};

export default Profile;
