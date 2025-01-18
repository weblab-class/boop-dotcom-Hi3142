import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import { get } from "../../utilities";

const Search = () => {
  myitem1 = {
    name: "myitem1",
    location: "Next",
    station: "action",
    avg_rating: 4.3,
    num_ratings: 17,
    hot_upvotes: 1,
    dietary_tags: ["Kosher", "Gluten free"],
    reviews: [],
  };
  return (
    <>
      <h1>Search page</h1>
      <Menu menuitem={[myitem1]} />
    </>
  );
};

export default Search;
