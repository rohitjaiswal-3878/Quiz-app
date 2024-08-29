const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resultSchema = new Schema({
  quizId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  questions: {
    type: [],
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const Result = mongoose.model("Result", resultSchema);
module.exports = Result;
