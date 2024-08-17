const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating user schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Creating model for user schema and exporting it.
const User = mongoose.model("User", userSchema);
module.exports = User;
