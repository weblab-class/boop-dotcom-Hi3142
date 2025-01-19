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
  /*const [reviews, setReviews] = useState([]);*/

  /*const addNewReview = (review) => {
    // TODO (step4): post the new comment to the server
    post("/api/review", review).then((reviewObj) => {
      setReviews(reviews.concat(reviewObj));
    });
  };

  useEffect(() => {
    // TODO (step3): fetch the comments from the server
    get("/api/reviews", { parent_item: props.menuitem._id }).then((returnedReviews) => {
      setReviews(returnedReviews);
    });
  }, []); */
  const myReview1 = {
    poster_id: "leens", //links to ID of user who posted it
    poster_name: "leensie",
    parent_item: "hello", //links to ID of the menu item
    rating: 2.1,
    timestamp: Date.now(),
    review_text: "this is review 1",
  };

  const myReview2 = {
    poster_id: "leens", //links to ID of user who posted it
    poster_name: "leensie",
    parent_item: "hi", //links to ID of the menu item
    rating: 4.2,
    timestamp: Date.now(),
    review_text: "this is review 2",
  };
  const reviews = [myReview1, myReview2];

  return (
    <div>
      <MenuItemDisplay menuitem={props.menuitem} />
      <ReviewBlock
        menuitem={props.menuitem}
        reviews={reviews.filter(
          (review) => review.parent_item === props.menuitem._id
        )} /*addNewReview={addNewReview}*/
      />
    </div>
  );
};

export default ItemBlock;
