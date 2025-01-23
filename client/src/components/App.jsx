import React, { useState, useEffect, createContext } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./modules/NavBar";

import jwt_decode from "jwt-decode";

import "../utilities.css";

import { socket } from "../client-socket";

import { get, post } from "../utilities";

export const UserContext = createContext(null);

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);
  const [userName, setUserName] = useState("Anonymous User");
  const [userFavorites, setUserFavorites] = useState([]);
  const [userDietaryFlags, setuserDietaryFlags] = useState([]);
  const [todayItems, setTodayItems] = useState();

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
        setUserName(user.name);
        setUserFavorites(user.favorites);
        setuserDietaryFlags(user.dietary_flags);
      }
    });
  }, []);

  useEffect(() => {
    //on first render
    //fetch all today's items from dining api; put (name, location, station)
    //into an array
    //for every item returned, find the corresponding ._id in the mongodb
    //if there is no such item, make it & put it in the mongodb
    //fetch("http://m.mit.edu/apis/dining/venues/house").then((data) => {
    //  console.log(data);
    // });
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  const authContextValue = {
    userId,
    userName,
    userFavorites,
    setUserFavorites,
    userDietaryFlags,
    handleLogin,
    handleLogout,
  };

  return (
    <>
      <NavBar handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
      <UserContext.Provider value={authContextValue}>
        <Outlet />
      </UserContext.Provider>
    </>
  );
};

export default App;
