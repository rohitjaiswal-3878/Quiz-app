const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const optionSchema = new Schema({
  text: {
    type: String,
    default: "",
  },
  imageURL: {
    type: String,
    default: "",
  },
  answer: {
    type: String,
    default: "wrong",
  },
});

const quizQuestion = new Schema({
  qType: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  options: {
    type: [optionSchema],
    required: true,
  },
  timer: {
    type: String,
    default: "off",
  },
});

const quizSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    questions: {
      type: [quizQuestion],
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;
