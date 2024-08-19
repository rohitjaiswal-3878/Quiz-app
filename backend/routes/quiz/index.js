const express = require("express");
const router = express.Router();
require("dotenv").config();
const Quiz = require("../../models/Quiz");

// Route for creating quiz
router.post("/create", async (req, res, next) => {
  try {
    const { name, type, questions } = req.body;
    const userId = req.user._id;

    let newQuiz = new Quiz({
      name,
      type,
      questions,
      userId,
    });
    await newQuiz.save();

    res.status(200).json({ message: "Quiz created successfully!" });
  } catch (err) {
    next(err);
  }
});

// Route to delete quiz
router.delete("/remove/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).status({ message: "Wrong request!" });
    }

    const userId = req.user._id;
    const quiz = await Quiz.findById(id);
    if (quiz.userId.toString() !== userId.toString()) {
      return res.status(400).json({ message: "Access Forbidden!" });
    }

    await Quiz.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted successfully!!" });
  } catch (err) {
    next(err);
  }
});

// Route to update quiz
router.patch("/edit/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).status({ message: "Wrong request!" });
    }

    const { questions } = req.body;
    const userId = req.user._id;
    const quiz = await Quiz.findById(id);
    if (quiz.userId.toString() !== userId.toString()) {
      return res.status(400).json({ message: "Access Forbidden!" });
    }

    const updatedQuiz = await Quiz.findByIdAndUpdate(
      id,
      { questions },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Quiz updated successfully!!", updatedQuiz });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
