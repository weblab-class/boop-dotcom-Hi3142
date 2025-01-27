import React, { useContext, useEffect, useState, createContext } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import { UserContext } from "../App";
import { get, post } from "../../utilities";
import MenuItemDisplay from "../modules/menuitemdisplay.jsx";
import Menu from "../modules/menu.jsx";
import "./Search.css";

export const SearchContext = createContext(null);

const Search = () => {
  const { userId, userFavorites } = useContext(UserContext);

  useEffect(() => {
    document.title = "Search - Bone Apple Tea!";
  }, []);

  const myitem1 = {
    name: "Sushi sushi sushi >:)",
    location: "Next",
    station: "action",
    avg_rating: 4.3,
    num_ratings: 17,
    hot_upvotes: 3,
    dietary_flags: ["Kosher", "Gluten free"],
    reviews: [],
    _id: "hello",
  };

  const myitem2 = {
    name: "Apple Pie",
    location: "Baker",
    station: "dessert",
    avg_rating: 2.3,
    num_ratings: 3,
    hot_upvotes: 2,
    dietary_flags: ["Kosher"],
    reviews: [],
    _id: "hi",
  };

  const myitem3 = {
    name: "Stir Fry",
    location: "McCormick",
    station: "stir fry",
    avg_rating: 4.8,
    num_ratings: 2,
    hot_upvotes: 0,
    dietary_flags: [],
    reviews: [],
    _id: "hey",
  };

  const myitem4 = {
    name: "Cheese Pizza",
    location: "Maseeh",
    station: "pizza",
    avg_rating: 3.1,
    num_ratings: 2,
    hot_upvotes: 0,
    dietary_flags: [],
    reviews: [],
    _id: "huh",
  };

  const myitem5 = {
    name: "Pepperoni Pizza",
    location: "Maseeh",
    station: "pizza",
    avg_rating: 3.8,
    num_ratings: 2,
    hot_upvotes: 0,
    dietary_flags: [],
    reviews: [],
    _id: "yea",
  };

  const myitem6 = {
    name: "Quesadillas",
    location: "Next",
    station: "action",
    avg_rating: 4.5,
    num_ratings: 2,
    hot_upvotes: 4,
    dietary_flags: [],
    reviews: [],
    _id: "yayyy",
  };

  const myitem7 = {
    name: "Chocolate Cake",
    location: "McCormick",
    station: "dessert",
    avg_rating: 3.1,
    num_ratings: 2,
    hot_upvotes: 1,
    dietary_flags: [],
    reviews: [],
    _id: "gr9",
  };
  const [itemlist, setItemList] = useState([]);

  useState(() => {
    get("/api/menuitems").then((returnedItems) => {
      setItemList(
        [myitem1, myitem2, myitem3, myitem4, myitem5, myitem6, myitem7].concat(returnedItems)
      );
    });
  }, []);

  const [userDietaryFlags, setUserDietaryFlags] = useState([]);

  useEffect(() => {
    get(`/api/dietary-flags`, { userId: userId }).then((returnedFlags) => {
      setUserDietaryFlags(returnedFlags);
    });
  }, []);

  useEffect(() => {
    setRequirements({
      halls: ["Baker", "McCormick", "Next", "Maseeh"],
      dietary_flags: userDietaryFlags,
    });
  }, [userDietaryFlags]);

  const [requirements, setRequirements] = useState({
    halls: ["Baker", "McCormick", "Next", "Maseeh"],
    dietary_flags: userDietaryFlags,
  });

  const Satisfies = (item, requirements) => {
    const positive_flags = requirements.dietary_flags.filter((flag) => flag[0] !== "!");
    const negative_flags = requirements.dietary_flags.filter((flag) => flag[0] === "!");
    return (
      requirements.halls.includes(item.location) &&
      positive_flags.every((flag) => item.dietary_flags.includes(flag)) &&
      !item.dietary_flags.some((flag) => negative_flags.includes("!" + flag))
    );
  };

  const [satisfyingItems, setSatisfyingItems] = useState([]);
  useEffect(() => {
    setSatisfyingItems(itemlist.filter((item) => Satisfies(item, requirements)));
  }, [itemlist, requirements]);

  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favoritedItems, setFavoritedItems] = useState([]);
  useEffect(() => {
    setFavoritedItems(
      favoritesOnly
        ? satisfyingItems.filter((value) => userFavorites.includes(value.name))
        : satisfyingItems
    );
  }, [favoritesOnly, userFavorites, satisfyingItems]);

  const [sortType, setSortType] = useState("top");
  const [filteredItems, setFilteredItems] = useState([]);
  useEffect(() => {
    if (sortType === "top") {
      setFilteredItems(favoritedItems.toSorted((a, b) => b.avg_rating - a.avg_rating));
    } else {
      setFilteredItems(favoritedItems.toSorted((a, b) => b.hot_upvotes - a.hot_upvotes));
    }
  }, [sortType, favoritedItems]);

  const [prefix, setPrefix] = useState("");
  const [matchingItems, setMatchingItems] = useState([]);

  useEffect(() => {
    setMatchingItems(
      filteredItems.filter((item) =>
        prefix
          .toLowerCase()
          .split(/(\s+)/)
          .every((prefixWord) =>
            item.name
              .toLowerCase()
              .split(/(\s+)/)
              .some((word) => word.startsWith(prefixWord))
          )
      )
    );
  }, [prefix, filteredItems]);

  const searchContextValue = {
    sortType,
    setSortType,
    favoritesOnly,
    setFavoritesOnly,
    prefix,
    setPrefix,
  };

  return (
    <>
      <SearchContext.Provider value={searchContextValue}>
        <Menu itemlist={matchingItems} />
      </SearchContext.Provider>
    </>
  );
};

export default Search;
