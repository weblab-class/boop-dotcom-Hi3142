import React from "react";
import Review from "./review.jsx";
import { NewReview } from "./newreview.jsx";

const ReviewBlock = (props) => {
  return (
    <div>
      {props.reviews.map((review) => (
        <Review reviewobj={review} key={`review_${review._id}`} />
      ))}
      <NewReview parent_item={props.menuitem._id} />
    </div>
  );
};
/*return (
    <div>
      <div>
        {props.reviews.map((review) => (
          <Review
            key={`Review_${review._id}`}
            _id={review._id}
            poster_name={review.poster_name}
            review_text={review.review_text}
            rating={review.rating}
          />
        ))}
        <NewReview parent_item={props.menuitem._id} addNewReview={props.addNewReview} />
      </div>
    </div>
  ); 
};*/

export default ReviewBlock;
