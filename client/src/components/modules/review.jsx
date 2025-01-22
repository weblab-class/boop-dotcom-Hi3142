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
        <p className="userName">{props.reviewobj.poster_name} | </p>
        <p className="rating"> {props.reviewobj.rating} stars</p>
      </div>
      <hr />
      <p className="reviewText">{props.reviewobj.review_text}</p>
    </div>
  );
};

export default Review;
