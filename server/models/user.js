const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  dietary_tags: [String],
  favorites: [String], //foodItemIds
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
