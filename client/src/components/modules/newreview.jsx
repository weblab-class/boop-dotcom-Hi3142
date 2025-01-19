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
    let id = "id" + Math.random().toString(16).slice(2);
    const review = {
      review_text: value,
      poster_name: "Anonymous User",
      _id: id,
      parent_item: "hi",
      rating: 5,
    };

    post("/api/review", review).then((reviewObj) => {
      addNewReview(reviewObj);
      console.log(reviewObj.review_text);
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
