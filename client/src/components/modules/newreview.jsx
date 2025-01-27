import React, { useState, useContext } from "react";
import { post } from "../../utilities";
import { UserContext } from "../App";
import { RatingReview } from "./reviewstars";
import "./newreview.css";

const NewReview = (props) => {
  const { userId, userName } = useContext(UserContext);
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
      poster_id: userId,
      poster_name: userName,
      parent_item: props.parent_item,
      timestamp: Date.now(),
      rating: rating,
    };

    post("/api/add-review", review).then((reviewObj) => {
      props.addReview(reviewObj);
      console.log(reviewObj.review_text, reviewObj.parent_item);
    });
  };

  return (
    <div className="reviewcontainer">
      <div className="reviewInputWrapper">
        <input
          type="text"
          placeholder="Add your review"
          value={value}
          onChange={handleChange}
          className="reviewInput"
          id="reviewInput"
        />
        &ensp;
        <button
          type="submit"
          value="Submit"
          onClick={handleSubmit}
          className="reviewSubmitButton u-circular-button"
        >
          +
        </button>
        &ensp;
        <RatingReview rating={rating} setRating={setRating} />
        &emsp;
      </div>
    </div>
  );
};

export { NewReview };
