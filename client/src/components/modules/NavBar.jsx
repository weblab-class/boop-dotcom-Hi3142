import React from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";

import "./NavBar.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = (props) => {
  const [activePage, setActivePage] = useState("search");

  return (
    <div className="navbar">
      <div className="navbar-title">🦴🍎🍵</div>
      <div className="nav-menu">
        <div
          onClick={() => {
            setActivePage("profile");
            console.log(activePage);
          }}
        >
          <Link
            to={`/profile/${props.userId}`}
            className={`u-circular-button nav-circle nav-circle-profile ${
              activePage === "profile" ? "active-page" : ""
            }`}
          >
            ME
          </Link>
        </div>
        <div
          onClick={() => {
            setActivePage("search");
            console.log(activePage);
          }}
        >
          <Link
            to="/search/"
            className={`u-circular-button nav-circle nav-circle-search ${
              activePage === "search" ? "active-page" : ""
            }`}
          >
            🔎
          </Link>
        </div>
        <div className="u-circular-button nav-circle nav-circle-home">
          {props.userId ? (
            <button onClick={props.handleLogout} className="signout">
              LOG OUT
            </button>
          ) : (
            <GoogleLogin
              onSuccess={props.handleLogin}
              onFailure={(err) => console.log(err)}
              containerProps={{ className: "googlelogin" }}
              type="icon"
              theme="filled_blue"
              size="large"
              shape="circle"
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default NavBar;
