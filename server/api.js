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
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/reviews", (req, res) => {
  Review.find({ parent_item: req.query.parent_item }).then((reviews) => res.send(reviews));
});

router.post("/review", (req, res) => {
  const newReview = new Review({
    poster_name: req.body.poster_name,
    parent_item: req.body.parent_item,
    review_text: req.body.review_text,
    rating: req.body.rating,
    timestamp: req.body.timestamp,
  });
  newReview.save().then((rev) => res.send(rev));
});

router.get(`/profile`, (req, res) => {
  User.findById(req.query.userId)
    .then((returnedUser) => {
      res.send(returnedUser);
    })
    .catch((err) => {
      res.status(500).send("User Not");
    });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
