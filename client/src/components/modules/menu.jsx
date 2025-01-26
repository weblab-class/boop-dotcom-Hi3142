import React, { useState, useEffect, useContext } from "react";
import ItemBlock from "./itemblock";
import { get } from "../../utilities";

import "./menu.css";
import { UserContext } from "../App";
import MenuOptionBar from "./menuoptionbar";
import MenuSearchBar from "./menusearchbar";

/*
Holds all the menuitems in response to a search for display
@param itemlist: {MenuItem[]} of menu items
*/
const Menu = (props) => {
  return (
    <section className="menuBox">
      <div className="menuTitle">SEARCH</div>
      <MenuSearchBar />
      <MenuOptionBar />
      {props.itemlist.length > 0 ? (
        <div className="itemArray">
          {" "}
          {props.itemlist.map((menuitem) => (
            <ItemBlock menuitem={menuitem} key={`item_${menuitem._id}`} />
            //eventually we will fetch updated infor here
          ))}{" "}
        </div>
      ) : (
        <p>No items to display!</p>
      )}
    </section>
  );
};

export default Menu;
