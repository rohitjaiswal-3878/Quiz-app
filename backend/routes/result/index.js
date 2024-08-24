const express = require("express");
const router = express.Router();
const Result = require("../../models/Result");
const Quiz = require("../../models/Quiz");
require("dotenv").config();
const authMiddleware = require("../../middlewares/authMiddleware");

// Route to save the result.
router.post("/create", async (req, res, next) => {
  try {
    const { quizId, userId, questions, type } = req.body;
    const newResult = new Result({
      quizId,
      userId,
      questions,
      type,
    });
    await newResult.save();
    res.status(200).json({ message: "Result created.", result: newResult });
  } catch (error) {
    next(error);
  }
});

// Route to update result.
router.patch("/update/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const { questions } = req.body;
    const result = await Result.findByIdAndUpdate(
      id,
      {
        questions,
      },
      { new: true }
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

// Route to get quizzes and their respective impressions for particular user.
router.get("/impression", authMiddleware, async (req, res, next) => {
  try {
    const userId = req.user._id;
    const allQuizes = await Quiz.find({ userId: userId });
    let quizImpressions = [];
    new Promise((resolve, reject) => {
      allQuizes.forEach((quiz, index) => {
        Result.find({ quizId: quiz._id }).then((allResults) => {
          const imp = {
            impression: allResults.length,
            name: quiz.name,
            created: quiz.createdAt,
          };
          quizImpressions.push(imp);
          if (quizImpressions.length == allQuizes.length) {
            resolve();
          }
        });
      });
    }).then(() => {
      res.status(200).json(quizImpressions);
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
