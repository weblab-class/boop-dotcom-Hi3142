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
              color: rating >= star ? "gold" : "gray",
              fontSize: `15px`,
            }}
            onClick={() => {
              setRating(star);
            }}
            key={star}
          >
            {" "}
            ★{" "}
          </span>
        );
      })}
    </span>
  );
}

export default RatingReview;
