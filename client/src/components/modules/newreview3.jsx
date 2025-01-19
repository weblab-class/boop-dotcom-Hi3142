import React, { useState } from "react";
import { post } from "../../utilities";

/**
 * New Post is a parent component for all input components
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} storyId optional prop, used for comments
 * @param {({storyId, value}) => void} onSubmit: (function) triggered when this post is submitted, takes {storyId, value} as parameters
 */
const NewReviewInput = (props) => {
  const [value, setValue] = useState("");

  // called whenever the user types in the new post input box
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // called when the user hits "Submit" for a new post
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit && props.onSubmit(value);
    setValue("");
  };

  return (
    <div>
      <input type="text" placeholder={props.defaultText} value={value} onChange={handleChange} />
      <button type="submit" value="Submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

/**
 * New Review
 *
 * Proptypes
 * @param {string} itemId is parent to review
 * @param {({value}) => void} addNewReview: (function) triggered when a review is submitted, takes {value} as parameters
 */
const NewReview = (props) => {
  const addReview = (value) => {
    // Give each review a unique id
    let id = "id" + Math.random().toString(16).slice(2);
    props.addNewReview({
      review_text: value,
      poster_name: "Anonymous User",
      _id: id,
      parent_item: props.itemId,
      rating: 5,
    });
  };

  return <NewReviewInput defaultText="Add your review" onSubmit={addReview} />;
};

export { NewReview };
