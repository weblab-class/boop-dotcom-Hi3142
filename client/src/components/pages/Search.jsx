import React, { useContext } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import { UserContext } from "../App";
import MenuItemDisplay from "../modules/menuitemdisplay.jsx";
import Menu from "../modules/menu.jsx";
import "./Search.css";

const Search = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  const myitem1 = {
    name: "myitem1",
    location: "Next",
    station: "action",
    avg_rating: 4.3,
    num_ratings: 17,
    hot_upvotes: 1,
    dietary_tags: ["Kosher", "Gluten free"],
    reviews: [],
    _id: "hello",
  };

  const myitem2 = {
    name: "myitem2",
    location: "Baker",
    station: "dessert",
    avg_rating: 2.3,
    num_ratings: 3,
    hot_upvotes: 0,
    dietary_tags: ["Kosher"],
    reviews: [],
    _id: "hi",
  };

  const itemlist = [myitem1, myitem2];

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
      <div>I AM A SEARCH WRAPPER</div>
      <Menu itemlist={itemlist} />
    </>
  );
};

export default Search;
