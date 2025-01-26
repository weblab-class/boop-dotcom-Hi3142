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
    if (userId) {
      get(`/api/profile`, { userId: userId }).then((userObj) => {
        setUser(userObj);
      });
      get(`/api/dietary-flags`, { userId: userId }).then((returnedFlags) => {
        setUserDietaryFlags(returnedFlags);
      });
    } else {
      setUser(undefined);
      setUserDietaryFlags([]);
    }
  }, [userId]);

  const toggleDietaryFlag = (flag) => () => {
    if (userDietaryFlags.includes(flag)) {
      post("/api/remove-dietary-flag", { item: flag }).then((res) => {
        setUserDietaryFlags(res.dietary_flags);
      });
    } else {
      post("/api/add-dietary-flag", { item: flag }).then((res) => {
        setUserDietaryFlags(res.dietary_flags);
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
    {
      name: "Halal",
      flag: "Halal",
    },
    {
      name: "No Peanut",
      flag: "!Peanut",
    },
    {
      name: "No Milk",
      flag: "!Milk",
    },
    {
      name: "No Wheat/Gluten",
      flag: "!Wheat/Gluten",
    },
    {
      name: "No Soy",
      flag: "!Soy",
    },
    {
      name: "No Egg",
      flag: "!Egg",
    },
    {
      name: "No Fish",
      flag: "!Fish",
    },
    {
      name: "No Sesame",
      flag: "!Sesame",
    },
  ];

  const [dropdownActive, setDropdownActive] = useState(false);
  return (
    <>
      {user ? (
        <div className="profile-wrapper">
          <h1>Hello, {user.name}!</h1>
          <div className="collapsible" onClick={() => setDropdownActive(!dropdownActive)}>
            {dropdownActive ? (
              <span>↑ Unmanage your dietary flags </span>
            ) : (
              <span> → Click to manage your dietary flags </span>
            )}
          </div>
          <div
            className="profile-dropdown-content"
            style={{
              display: dropdownActive ? "block" : "none",
            }}
          >
            {buttons.map((button) => (
              <div>
                <Checkbox
                  label={button.name}
                  value={userDietaryFlags.includes(button.flag)}
                  onChange={toggleDietaryFlag(button.flag)}
                  key={button.flag}
                />
              </div>
            ))}
          </div>

          <p>Manage favorites</p>
        </div>
      ) : (
        <div> Please sign in!</div>
      )}
    </>
  );
};

export default Profile;
