import React, { useState, useEffect } from "react";
import Review from "./review.jsx";
import ReviewBlock from "./reviewblock.jsx";
import { get, post } from "../../utilities";
import MenuItemDisplay from "./menuitemdisplay.jsx";

/**
 * Card is a component for displaying content like stories
 *
 * Proptypes
 * @param {menuitem} menuitem
 */
const ItemBlock = (props) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    get("/api/reviews", { parent_item: props.menuitem._id }).then((returnedReviews) => {
      setReviews(returnedReviews);
    });
    /*get("/api/reviews", { myparam: "hi" }).then((returned) => console.log(returned));*/
  }, []);

  return (
    <div>
      <MenuItemDisplay menuitem={props.menuitem} />
      <ReviewBlock
        menuitem={props.menuitem}
        reviews={reviews.filter((review) => review.parent_item === props.menuitem._id)}
      />
    </div>
  );
};

export default ItemBlock;
