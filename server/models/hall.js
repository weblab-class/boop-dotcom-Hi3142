const mongoose = require("mongoose");

const HallSchema = new mongoose.Schema({
  name: String,
  meals: {
    type: [
      {
        mealName: String,
        from: { hour: Number, minute: Number },
        to: { hour: Number, minute: Number },
      },
    ],
    default: [],
  },
});

// compile model from schema
module.exports = mongoose.model("hall", HallSchema);
