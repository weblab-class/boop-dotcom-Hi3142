import React, { useState, useEffect, useContext } from "react";
import { get, post } from "../../utilities";
import { UserContext } from "../App";
import Checkbox from "./checkbox";

import "./menuitemdisplay.css";
//passed in a menuitem, will display the menuitem appropriately
/**
 *
 * @param {string} _id of comment
 * @param {Number} avg_rating
 * @param {String} name, location, station
 * @param {Number} num_ratings
 * @param {Number} hot_upvotes
 * @param {[String]} dietary_flags
 * @param {[Review]} reviews
 * @returns
 *
 * @param {boolean}
 */
const MenuItemDisplay = (props) => {
  const { userId, userFavorites, setUserFavorites } = useContext(UserContext);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!userId) {
      console.warn("User ID is undefined");
      return;
    }

    console.log(userId);
    get("/api/favorites", { userid: userId }).then((returnedFavs) => {
      setUserFavorites(returnedFavs);
    });
  }, [userId]);

  useEffect(() => {
    setChecked(userId !== undefined && userFavorites.includes(props.menuitem.name));
  }, [userFavorites]);

  const handleChange = () => {
    console.log({ userid: userId, item: props.menuitem.name });
    if (checked) {
      post("/api/remove-favorite", { userid: userId, item: props.menuitem.name }).then((res) => {
        setUserFavorites(res.favorites);
        console.log({ userid: userId, item: props.menuitem.name });
      });
    } else {
      post("/api/add-favorite", { userid: userId, item: props.menuitem.name }).then((res) => {
        setUserFavorites(res.favorites);
        console.log({ userid: userId, item: props.menuitem.name });
      });
    }
  };

  return (
    <div>
      <div className="menuItemWrap">
        <div className="left-aligned">
          <p className="itemName">{props.menuitem.name}</p>
          <p>
            | {props.menuitem.location} @ {props.menuitem.station}
          </p>
        </div>
        <div className="right-aligned">
          {userId && (
            <p>
              <Checkbox label="Favorite?" value={checked} onChange={handleChange} />
            </p>
          )}
          <p>Rating: {props.menuitem.avg_rating}</p>
          <p>Hot: {props.menuitem.hot_upvotes}</p>
        </div>
      </div>
    </div>
  );
};

export default MenuItemDisplay;
