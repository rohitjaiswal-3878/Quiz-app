const express = require("express");
const router = express.Router();
require("dotenv").config();
const Quiz = require("../../models/Quiz");
const Result = require("../../models/Result");
const authMiddleware = require("../../middlewares/authMiddleware");

// Route for creating quiz
router.post("/create", authMiddleware, async (req, res, next) => {
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

    res.status(200).json({ message: "Quiz created successfully!", newQuiz });
  } catch (err) {
    next(err);
  }
});

// Route to delete quiz
router.delete("/remove/:id", authMiddleware, async (req, res, next) => {
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

    const allImpression = await Result.deleteMany({ quizId: id });
    await Quiz.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted successfully!!" });
  } catch (err) {
    next(err);
  }
});

// Route to update quiz
router.patch("/edit/:id", authMiddleware, async (req, res, next) => {
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

// Route to get Quiz by id
router.get("/fetch/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const quizData = await Quiz.findById(id);
    res.status(200).json(quizData);
  } catch (err) {
    next(err);
  }
});

// Route to get all quiz of particular user
router.get("/all-quizzes", authMiddleware, async (req, res, next) => {
  try {
    const userId = req.user._id;
    const allQuizzes = await Quiz.find({ userId });
    res.status(200).json(allQuizzes);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
