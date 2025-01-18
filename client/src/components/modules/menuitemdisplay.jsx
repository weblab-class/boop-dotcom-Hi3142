import React, { useState, useEffect } from "react";
import { get } from "../../utilities";

import "./menuitemdisplay.css";
//passed in a menuitem, will display the menuitem appropriately
/**
 *
 * @param {string} _id of comment
 * @param {Number} avg_rating
 * @param {String} name, location, station
 * @param {Number} num_ratings
 * @param {Number} hot_upvotes
 * @param {[String]} dietary_tags
 * @param {[Review]} reviews
 * @returns
 */
const MenuItemDisplay = (props) => {
  return (
    <div>
      <div className="menuItemWrap">
        <div className="left-aligned">
          <p className="itemName">{props.item.name}</p>
          <p>
            | {props.item.location} @ {props.item.station}
          </p>
        </div>
        <div className="right-aligned">
          <p>Rating: {props.item.avg_rating}</p>
          <p>Hot: {props.item.hot_upvotes}</p>
        </div>
      </div>
    </div>
  );
};

export default MenuItemDisplay;
