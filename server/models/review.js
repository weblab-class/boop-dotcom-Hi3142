const mongoose = require("mongoose");

//define a message schema for the database
const ReviewSchema = new mongoose.Schema({
  poster_id: String, //links to ID of user who posted it
  poster_name: String,
  parent_item: String, //links to ID of the menu item
  rating: Number,
  timestamp: { type: Date, default: Date.now },
  review_text: String,
  _id: String,
});

// compile model from schema
module.exports = mongoose.model("review", ReviewSchema);
