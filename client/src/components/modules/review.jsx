import React from "react";
import "./review.css";
/**
 * Render a review
 * @param {review} reviewobj has all the desired properties
 */

const Review = (props) => {
  return (
    <div className="reviewWrap1">
      <div className="reviewWrap">
        <p className="userName">
          {props.reviewobj.poster_name} gives {props.reviewobj.rating} stars
        </p>
        <p>{props.reviewobj.timestamp}</p>
      </div>
      <hr />
      <p>{props.reviewobj.review_text}</p>
      <p>
        {props.reviewobj.parent_item} and {props.key}
      </p>
    </div>
  );
};

export default Review;
