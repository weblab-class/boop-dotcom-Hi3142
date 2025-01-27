import React from "react";
import Review from "./review.jsx";
("");
import { NewReview } from "./newreview.jsx";
import { post } from "../../utilities.js";
import "./reviewblock.css";

const ReviewBlock = (props) => {
  const removeReview = (reviewId) => {
    post("/api/remove-review", { review_id: reviewId.toString() }).then(() => {
      props.setReviews(props.reviews.filter((review) => review._id !== reviewId));
    });
  };
  // console.log(props);

  const addReview = (reviewObj) => {
    props.setReviews(props.reviews.concat([reviewObj]));
  };

  return (
    <div className="reviewBlockWrapper">
      <NewReview parent_item={props.menuitem._id} addReview={addReview} />
      {props.reviews.map((review) => (
        <Review
          reviewobj={review}
          key={`review_${review._id}`}
          removeThisReview={() => removeReview(review._id)}
        />
      ))}
    </div>
  );
};

export default ReviewBlock;
