import React from "react";
import Review from "./review.jsx";
import { NewReview } from "./newreview.jsx";
import "./reviewblock.css";

const ReviewBlock = (props) => {
  return (
    <div className="reviewBlockWrapper">
      <NewReview parent_item={props.menuitem._id} reviewUpdater={props.reviewUpdater} />
      {props.reviews.toReversed().map((review) => (
        <Review reviewobj={review} key={`review_${review._id}`} />
      ))}
    </div>
  );
};

export default ReviewBlock;
