import React, { useState, useEffect, useContext } from "react";
import ItemBlock from "./itemblock";
import { get } from "../../utilities";

import "./menu.css";
import { UserContext } from "../App";
import MenuOptionBar from "./menuoptionbar";

/*
Holds all the menuitems in response to a search for display
@param itemlist: {MenuItem[]} of menu items
@param sortType: String denoting sort type, used in menu option bar
@param setSortType: React Hook for sortType, used in menu option bar
*/
const Menu = (props) => {
  return (
    <section className="menuWrapper">
      <div className="menuTitle">MENU</div>
      <MenuOptionBar sortType={props.sortType} setSortType={props.setSortType} />
      <div className="itemArray">
        {" "}
        {props.itemlist.map((menuitem) => (
          <ItemBlock menuitem={menuitem} key={`item_${menuitem._id}`} />
          //eventually we will fetch updated infor here
        ))}{" "}
      </div>
    </section>
  );
};

export default Menu;
