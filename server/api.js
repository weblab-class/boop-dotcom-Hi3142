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

router.get("/favorites", (req, res) => {
  console.log(req);
  User.findOne({ _id: req.user._id })
    .then((user) => {
      res.send(user.favorites);
    })
    .catch((err) => {
      res.status(500).send("User Not");
    });
});

router.post("/add-favorite", (req, res) => {
  User.findOne({ _id: req.user._id }).then((user) => {
    if (!user.favorites) {
      user.favorites = [];
    }
    if (!user.favorites.includes(req.body.item)) {
      user.favorites.push(req.body.item);
      user.save();
    }
    res.send({ favorites: user.favorites });
  });
});

router.post("/remove-favorite", (req, res) => {
  User.findOne({ _id: req.user._id }).then((user) => {
    if (!user.favorites) {
      user.favorites = [];
    }
    const index = user.favorites.indexOf(req.body.item);
    if (index > -1) {
      // only splice array when item is found
      user.favorites.splice(index, 1); // 2nd parameter means remove one item only
      user.save();
    }
    res.send({ favorites: user.favorites });
  });
});

/*
import data from "../../dining.json";
console.log(data);
let mealsList = data[5].meals_by_day[0].meals;
mealsList.forEach((element) => {
  let newList = element.items;
  newList.forEach((newEle) => {
    MenuItem.find({ name: newEle.name, location: "Maseeh" }).then((foundItems) => {
      if (foundItems == null) {
        const newItem = new MenuItem({
          name: newEle.name,
          location: "Maseeh",
          station: newEle.station,
          dietary_tags: newEle.dietary_flags,
        });
        newItem.save();
      }
      foundItems.forEach((item) => {
        setTodayItems([...todayItems, item._id]);
      });
    });
  });*/
//let newList = element.items;
//newList.forEact((newEle) => {
//console.log(newEle);
//});
//});

//const MenuItem = require("./models/menuitem.js");

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
