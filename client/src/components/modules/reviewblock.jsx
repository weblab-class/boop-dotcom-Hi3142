import React from "react";
import Review from "./review.jsx";
import { NewReview } from "./newreview.jsx";

const ReviewBlock = (props) => {
  return (
    <div>
      {props.reviews.map((review) => (
        <Review reviewobj={review} key={`review_${review._id}`} />
      ))}
      <NewReview parent_item={props.menuitem._id} reviewUpdater={props.reviewUpdater} />
    </div>
  );
};

export default ReviewBlock;
