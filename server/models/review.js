const mongoose = require("mongoose");

//define a message schema for the database
const ReviewSchema = new mongoose.Schema({
  poster_id: String,
  poster_name: String,
  parentItem: String,
  rating: Number,
  timestamp: { type: Date, default: Date.now },
  reviewtext: String,
});

// compile model from schema
module.exports = mongoose.model("review", ReviewSchema);
