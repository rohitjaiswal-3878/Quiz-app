const express = require("express");
const router = express.Router();
require("dotenv").config();
const Quiz = require("../../models/Quiz");

router.post("/create", async (req, res, next) => {
  try {
    const { name, type, questions } = req.body;
    const userId = req.user._id;

    let newQuiz;
    if (type == "qa") {
      newQuiz = new Quiz({
        name,
        type,
        questions,
        userId,
      });
      await newQuiz.save();
    }

    res.status(200).json({ message: "Quiz created successfully!" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
