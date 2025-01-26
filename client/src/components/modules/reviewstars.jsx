import React from "react";

export function RatingReview({ rating, setRating }) {
  return (
    <span>
      {[1, 2, 3, 4, 5].map((star) => {
        return (
          <span
            className="start"
            style={{
              cursor: "pointer",
              color: rating >= star ? "#ffb800" : "#9115a7",
              fontSize: `25px`,
            }}
            onClick={() => {
              setRating(star);
            }}
            key={star}
          >
            ★
          </span>
        );
      })}
    </span>
  );
}

export default RatingReview;
