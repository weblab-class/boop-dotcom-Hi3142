import React, { useState, useEffect } from "react";
import Review from "./review.jsx";
import ReviewBlock from "./reviewblock.jsx";
import { get, post } from "../../utilities";
import MenuItemDisplay from "./menuitemdisplay.jsx";
import "./itemblock.css";

/**
 * Card is a component for displaying content like stories
 *
 * Proptypes
 * @param {menuitem} menuitem
 */
const ItemBlock = (props) => {
  const [reviews, setReviews] = useState([]);
  const this_parent_item = props.menuitem._id;

  useEffect(() => {
    get("/api/reviews", { parent_item: this_parent_item }).then((returnedReviews) => {
      setReviews(returnedReviews);
    });
  }, []);

  const reviewUpdater = (reviewObj) => {
    setReviews(reviews.concat([reviewObj]));
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleContent = () => {
    setIsOpen((prevState) => !prevState); // Toggle the state between true and false
  };

  return (
    <div>
      {/* Collapsible button */}
      <button onClick={toggleContent} className={`collapsible ${isOpen ? "active" : ""}`}>
        <MenuItemDisplay menuitem={props.menuitem} isOpen={isOpen} />
      </button>

      {/* Collapsible content with dynamic maxHeight */}
      <div
        style={{
          maxHeight: isOpen ? "300px" : "0", // Set maxHeight based on state
          overflow: "scroll",
          transition: "max-height 0.2s ease-out", // Smooth transition for opening/closing
        }}
        className="content"
      >
        <ReviewBlock menuitem={props.menuitem} reviews={reviews} reviewUpdater={reviewUpdater} />
      </div>
    </div>
  );
};

export default ItemBlock;
