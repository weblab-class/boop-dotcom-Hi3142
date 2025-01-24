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
const MenuSearchBar = (props) => {
  const { setPrefix } = useContext(SearchContext);

  const [value, setValue] = useState("");

  useEffect(() => {
    setPrefix(value);
  }, [value]);

  // called whenever the user types in the new post input box
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // called when the user hits "Submit" for a new post
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="reviewInputWrapper">
      <input
        type="text"
        placeholder="Search for a food..."
        value={value}
        onChange={handleChange}
        className="reviewInput"
      />
      <span className="u-alignRight">
        <button type="submit" value="Submit" onClick={handleSubmit} className="submitButton u-bold">
          Search
        </button>
      </span>
    </div>
  );
};

export default MenuSearchBar;
