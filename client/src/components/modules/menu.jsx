import React, { useState, useEffect } from "react";
import MenuItemDisplay from "./menuitemdisplay";
import { get } from "../../utilities";

import "./menu.css";

//component that holds all the menuitems in response to a search for display
//takes in @param {MenuItem[]} of menu items

const Menu = (props) => {
  return (
    <div>
      {props.menuitems.map((menuitem) => (
        <MenuItemDisplay
          key={"MenuItem_${menuitem._id}"}
          _id={menuitem._id}
          avg_rating={menuitem.avg_rating}
          num_ratings={menuitem.num_ratings}
          hot_upvotes={menuitem.hot_upvotes}
          dietary_tags={menuitem.dietary_tags}
          reviews={menuitem.reviews}
          name={menuitem.name}
          location={menuitem.location}
          station={menuitem.station}
        />
        //eventually we will fetch updated infor here
      ))}
    </div>
  );
};

export default Menu;
