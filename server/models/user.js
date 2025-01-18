const mongoose = require("mongoose");
const MenuItem = require("./menuitem.js");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  dietary_tags: [String],
  favorites: [MenuItem],
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
