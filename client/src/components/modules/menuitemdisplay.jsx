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
    get("/api/favorites", { userid: userId }).then((returnedFavs) => {
      setUserFavorites(returnedFavs);
    });
  }, [userId]);

  useEffect(() => {
    setChecked(userId !== undefined && userFavorites.includes(props.menuitem.name));
  }, [userFavorites, userId]);

  const handleChange = () => {
    if (checked) {
      post("/api/remove-favorite", { userid: userId, item: props.menuitem.name }).then((res) => {
        setUserFavorites(res.favorites);
      });
    } else {
      post("/api/add-favorite", { userid: userId, item: props.menuitem.name }).then((res) => {
        setUserFavorites(res.favorites);
      });
    }
  };

  return (
    <div>
      <div className={`menuItemWrap ${props.isOpen ? "active" : ""}`}>
        <div className="left-aligned">
          <div className="itemName">{props.menuitem.name}</div>
          <div>
            | {props.menuitem.location} @ {props.menuitem.station}
          </div>
        </div>
        <div className="right-aligned">
          {userId && (
            <div>
              <Checkbox
                label="♥︎"
                value={checked}
                onChange={handleChange}
                style={{
                  color: checked ? "#ffb800" : "#9115a7",
                }}
              />
            </div>
          )}
          <div>★ {props.menuitem.avg_rating}</div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemDisplay;
