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
const MenuItem = require("./models/menuitem");

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
  Review.find({ parent_item: req.query.parent_item }).then((reviews) => {
    res.send(reviews);
  });
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

router.get("/menuitems", (req, res) => {
  MenuItem.find().then((items) => {
    res.send(items);
  });
});

router.post("/add-item", (req, res) => {
  var thisItem = new MenuItem({
    name: req.body.name,
    location: req.body.location,
    station: req.body.station,
    avg_rating: req.body.avg_rating,
    num_ratings: req.body.num_ratings,
    hot_upvotes: req.body.hot_upvotes,
    dietary_flags: req.body.dietary_flags,
    meal: "beeeeekfast",
  });
  console.log(thisItem);
  thisItem.save().then((rev) => res.send(rev));
});

router.post("/update-item", (req, res) => {
  var thisItem;
  if (!MenuItem.findOne({ name: req.body.name }).then((item) => (thisItem = item))) {
    thisItem = new MenuItem({
      name: req.body.name,
      location: req.body.location,
      station: req.body.station,
      avg_rating: req.body.avg_rating,
      num_ratings: req.body.num_ratings,
      hot_upvotes: req.body.hot_upvotes,
      dietary_flags: req.body.dietary_flags,
      meal: "beeeeekfast",
    });
  }
  console.log(thisItem);
  thisItem.save().then((rev) => res.send(rev));
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

router.get("/dietary-flags", (req, res) => {
  User.findOne({ _id: req.user._id })
    .then((user) => {
      res.send(user.dietary_flags);
    })
    .catch((err) => {
      res.status(500).send("User Not");
    });
});

router.post("/add-dietary-flag", (req, res) => {
  User.findOne({ _id: req.user._id }).then((user) => {
    if (!user.dietary_flags) {
      user.dietary_flags = [];
    }
    if (!user.dietary_flags.includes(req.body.item)) {
      user.dietary_flags.push(req.body.item);
      user.save();
    }
    res.send({ dietary_flags: user.dietary_flags });
  });
});

router.post("/remove-dietary-flag", (req, res) => {
  User.findOne({ _id: req.user._id }).then((user) => {
    if (!user.dietary_flags) {
      user.dietary_flags = [];
    }
    const index = user.dietary_flags.indexOf(req.body.item);
    if (index > -1) {
      // only splice array when item is found
      user.dietary_flags.splice(index, 1); // 2nd parameter means remove one item only
      user.save();
    }
    res.send({ dietary_flags: user.dietary_flags });
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
          dietary_flags: newEle.dietary_flags,
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
