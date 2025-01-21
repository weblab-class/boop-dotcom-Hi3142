import React from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import "./NavBar.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = (props) => {
  return (
    <nav className="NavBar-container ">
      <div className="NavBar-title u-inlineBlock">Bone Apple Tea :)</div>
      <div className="NavBar-linkContainer u-inlineBlock">
        <Link to="/" className="NavBar-link">
          Home (Skeleton)
        </Link>
        <Link to="/search/" className="NavBar-link u-inlineBlock">
          Search
        </Link>
      </div>
      <div className="u-alignRight u-inlineBlock">
        {props.userId ? (
          <button className="NavBar-link NavBar-login u-inlineBlock" onClick={props.handleLogout}>
            Sign out
          </button>
        ) : (
          <GoogleLogin
            text="signin_with"
            onSuccess={props.handleLogin}
            onFailure={(err) => console.log(err)}
            containerProps={{ className: "NavBar-link NavBar-login u-inlineBlock" }}
          />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
