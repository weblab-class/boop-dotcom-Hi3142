import React, { useContext, useState, useEffect } from "react";
import "./review.css";

import { UserContext } from "../App";

/**
 * Render a review
 * @param {review} reviewobj has all the desired properties
 * @param removeThisReview is a function that removes this review
 */

const Review = (props) => {
  const userId = useContext(UserContext).userId;

  function timeAgo(timestamp) {
    const [now, setNow] = useState(new Date());
    const [intervalTime, setIntervalTime] = useState(1000); // Start with 1 second

    useEffect(() => {
      const interval = setInterval(() => {
        setNow(new Date());

        // After 60 seconds, switch to a 1-minute interval
        const ms = new Date() - timestamp;
        if (ms >= 60 * 1000 && ms < 60 * 60 * 1000) {
          setIntervalTime(60 * 1000); // Update interval to 1 minute (60,000 ms)
        } else if (ms > 60 * 60 * 1000) {
          setIntervalTime(60 * 60 * 1000); // Update interval to 1 hour (3,600,000 ms)
        }
        // We stop here, nearly zero compute is saved afterwards
      }, intervalTime);
      return () => clearInterval(interval);
    }, [intervalTime, timestamp]);

    const getTimeAgo = () => {
      const seconds = Math.floor((now - timestamp) / 1000);

      if (seconds == 0) return "now";
      if (seconds < 60) return `${seconds} second${seconds === 1 ? "" : "s"} ago`;
      const minutes = Math.floor(seconds / 60);
      if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
      const hours = Math.floor(minutes / 60);
      if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
      const days = Math.floor(hours / 24);
      return `${days} day${days === 1 ? "" : "s"} ago`;
    };

    return getTimeAgo();
  }
  console.log(timeAgo(Date.parse(props.reviewobj.timestamp)));

  return (
    <div className="outerReviewWrap">
      <div className="allrating">
        <p className="rating"> {"★".repeat(props.reviewobj.rating)} </p>
        <p className="badrating"> {"★".repeat(5 - props.reviewobj.rating)} </p>
      </div>
      <div className="reviewWrap">
        <p className="userName">{props.reviewobj.poster_name} </p>
        &ensp; &ensp;
        <p className="dateText">{timeAgo(Date.parse(props.reviewobj.timestamp))}</p>
        {userId && userId === props.reviewobj.poster_id && (
          <p className="removeReviewButton" onClick={props.removeThisReview}>
            {" "}
            🗑️
          </p>
        )}
      </div>
      <p className="reviewText">{props.reviewobj.review_text}</p>
    </div>
  );
};

export default Review;
