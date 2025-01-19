import React, { useState } from "react";
import { post } from "../../utilities";

const NewReview = (props) => {
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
  };

  const addNewReview = (value) => {
    const review = {
      review_text: value,
      poster_name: "Anonymous User",
      parent_item: props.parent_item,
      timestamp: Date.now(),
      rating: 5,
    };

    post("/api/review", review).then((reviewObj) => {
      props.reviewUpdater(reviewObj);
      console.log(reviewObj.review_text, reviewObj.parent_item);
    });
  };

  return (
    <div>
      <input type="text" placeholder="Add your review" value={value} onChange={handleChange} />
      <button type="submit" value="Submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export { NewReview };
