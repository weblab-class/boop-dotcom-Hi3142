/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();
const Review = require("./models/review");

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
/*router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});*/

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|
const myReview1 = {
  poster_id: "leens", //links to ID of user who posted it
  poster_name: "leensie",
  parent_item: "hello", //links to ID of the menu item
  rating: 2.1,
  timestamp: Date.now(),
  review_text: "this is review 1",
};

const myReview2 = {
  poster_id: "leens", //links to ID of user who posted it
  poster_name: "leensie",
  parent_item: "hi", //links to ID of the menu item
  rating: 4.2,
  timestamp: Date.now(),
  review_text: "this is review 2",
};
const myReview3 = {
  poster_id: "leens", //links to ID of user who posted it
  poster_name: "leensie",
  parent_item: "hi", //links to ID of the menu item
  rating: 5,
  timestamp: Date.now(),
  review_text: "this is review 3",
};
const reviews = [myReview1, myReview2, myReview3];

router.get("/reviews", (req, res) => {
  Review.find({ parent_item: req.query.parent_item }).then((reviews) => res.send(reviews));
});

router.post("/review", (req, res) => {
  const newReview = new Review({
    poster_name: "leensie",
    parent_item: req.body.parent_item,
    review_text: req.body.review_text,
  });
  //newReview.save().then((rev) => res.send(rev));
  res.send(newReview);
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
