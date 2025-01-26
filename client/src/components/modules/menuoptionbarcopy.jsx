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
      <div className="singleOption" onClick={setTop} value={sortType === "top"}>
        Top
      </div>
      &ensp;
      <div className="singleOption" onClick={setTop} value={sortType === "top"}>
        Hot
      </div>
      <Checkbox
        label="Top"
        value={sortType === "top"}
        onChange={setTop}
        className="singleOption"
      ></Checkbox>
      <Checkbox label="Hot" value={sortType === "hot"} onChange={setHot}></Checkbox>
      {/*
      &ensp;
      <Checkbox label="Hot" value={sortType === "hot"} onChange={setHot}></Checkbox>
      {userId && (
        <>
          &emsp; &emsp;
          <Checkbox
            label="Favorites Only"
            value={favoritesOnly}
            onChange={toggleFavorites}
          ></Checkbox>
        </>
      )}*/}
    </section>
  );
};

//export default MenuOptionBar;
