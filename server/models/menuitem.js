const mongoose = require("mongoose");
const Review = require("./review.js");

const MenuItemSchema = new mongoose.Schema({
  name: String,
  location: String,
  station: String,
  avg_rating: Number,
  num_ratings: Number,
  hot_upvotes: Number,
  dietary_tags: [String],
  reviews: [Review],
});

// compile model from schema
module.exports = mongoose.model("menuitem", MenuItemSchema);
