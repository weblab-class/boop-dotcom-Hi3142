import React from "react";
import "./review.css";
/**
 * Render a review
 * @param {review} reviewobj has all the desired properties
 * @param removeThisReview is a function that removes this review
 */

const Review = (props) => {
  return (
    <div className="reviewWrap1" onClick={props.removeThisReview}>
      <p className="userName">{props.reviewobj.poster_name}: </p>
      {props.reviewobj.rating !== 1 ? (
        <p className="rating"> {props.reviewobj.rating} stars</p>
      ) : (
        <p className="rating"> {props.reviewobj.rating} star</p>
      )}
      <p className="dateText"> | {props.reviewobj.timestamp.slice(0, 10)}</p>
      <p className="reviewText"> | {props.reviewobj.review_text}</p>
      <p className="removeReviewButton"> 🗑️ Delete my review</p>
    </div>
  );
};

export default Review;
