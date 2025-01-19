const mongoose = require("mongoose");

const ItemStatusSchema = new mongoose.Schema({
  curr_status: String,
  status_history: [
    {
      user_name: String,
      then_status: String,
    },
  ],
});

// compile model from schema
module.exports = mongoose.model("itemstatus", ItemStatusSchema);
