import React, { useState, useContext } from "react";
import { post } from "../../utilities";
import { UserContext } from "../App";
import { RatingReview } from "./RatingReview";
import "./newreview.css";

const NewReview = (props) => {
  const userName = useContext(UserContext).userName;
  const [rating, setRating] = useState(0);
  const [value, setValue] = useState("");

  // called whenever the user types in the new post input box
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // called when the user hits "Submit" for a new post
  const handleSubmit = (event) => {
    event.preventDefault();
    addNewReview && addNewReview(value);
    setValue("");
    setRating(0);
  };

  const addNewReview = (value) => {
    const review = {
      review_text: value,
      poster_name: userName,
      parent_item: props.parent_item,
      timestamp: Date.now(),
      rating: rating,
    };

    post("/api/review", review).then((reviewObj) => {
      props.reviewUpdater(reviewObj);
      console.log(reviewObj.review_text, reviewObj.parent_item);
    });
  };

  return (
    <div className="container">
      <div className="reviewInputWrapper">
        <input
          type="text"
          placeholder="Add your review"
          value={value}
          onChange={handleChange}
          className="reviewInput"
        />
        &ensp;
        <span className="u-alignRight">
          <RatingReview rating={rating} setRating={setRating} />
          &ensp;
          <button
            type="submit"
            value="Submit"
            onClick={handleSubmit}
            className="submitButton u-bold"
          >
            Submit
          </button>
        </span>
      </div>
    </div>
  );
};

export { NewReview };
