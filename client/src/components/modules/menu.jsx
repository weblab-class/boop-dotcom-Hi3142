import React, { useState, useEffect } from "react";
import MenuItemDisplay from "./menuitemdisplay";
import { get } from "../../utilities";

import "./menu.css";

//component that holds all the menuitems in response to a search for display
//takes in @param {MenuItem[]} of menu items

const Menu = (props) => {
  return (
    <section className="menuWrapper">
      <p className="menuTitle">MENU WRAPPER</p>
      <div className="itemArray">
        {" "}
        {props.itemlist.map((menuitem) => (
          <MenuItemDisplay item={menuitem} key={`item_${menuitem._id}`} />
          //eventually we will fetch updated infor here
        ))}{" "}
      </div>
    </section>
  );
};

export default Menu;
