import React, { useState, useEffect, useContext } from "react";
import ItemBlock from "./itemblock";
import { get } from "../../utilities";
import Checkbox from "./checkbox";

import "./menuoptionbar.css";
import { UserContext } from "../App";
import { SearchContext } from "../pages/Search";

/*
Component that holds the buttons to pick search options in a menu.
*/
const MenuOptionBar = (props) => {
  const { userId } = useContext(UserContext);
  const { sortType, setSortType, favoritesOnly, setFavoritesOnly } = useContext(SearchContext);
  const setTop = () => {
    setSortType("top");
  };
  const setHot = () => {
    setSortType("hot");
  };
  const toggleFavorites = () => {
    setFavoritesOnly(!favoritesOnly);
  };

  return (
    <section className="optionBarWrapper">
      <div>Sort by:</div>
      &ensp;
      <div className={`singleOption ${sortType === "top" ? "single-option-active" : ""}`}>
        <Checkbox
          label="TOP"
          value={sortType === "top"}
          onChange={setTop}
          className="hidden-checkbox"
        ></Checkbox>
      </div>
      &ensp;
      <div className={`singleOption ${sortType === "hot" ? "single-option-active" : ""}`}>
        <Checkbox label="HOT" value={sortType === "hot"} onChange={setHot}></Checkbox>
      </div>
      &ensp;
      <div className={`singleOption ${favoritesOnly ? "single-option-active" : ""}`}>
        {userId && (
          <>
            <Checkbox
              label="FAVORITES ONLY"
              value={favoritesOnly}
              onChange={toggleFavorites}
            ></Checkbox>
          </>
        )}
      </div>
    </section>
  );
};

export default MenuOptionBar;
