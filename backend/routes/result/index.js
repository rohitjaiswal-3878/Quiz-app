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
    if (allQuizes.length == 0) {
      return res.status(200).json({
        filteredImpression: [],
        totalImpressions: 0,
        quizImpressions: [],
      });
    }
    let quizImpressions = [];
    new Promise((resolve, reject) => {
      allQuizes.forEach((quiz, index) => {
        Result.find({ quizId: quiz._id }).then((allResults) => {
          const imp = {
            impression: allResults.length,
            name: quiz.name,
            created: quiz.createdAt,
            quizId: quiz._id,
          };
          quizImpressions.push(imp);
          if (quizImpressions.length == allQuizes.length) {
            resolve();
          }
        });
      });
    }).then(() => {
      let totalImpressions = 0;
      let filteredImpression = quizImpressions.filter((ele) => {
        totalImpressions += ele.impression;
        return ele.impression > 10;
      });
      quizImpressions.sort((a, b) => a.created - b.created);
      filteredImpression.sort((a, b) => b.impression - a.impression);
      res
        .status(200)
        .json({ filteredImpression, totalImpressions, quizImpressions });
    });
  } catch (error) {
    next(error);
  }
});

// Route to get analytics of particular quiz.
router.get("/analytics/:id", authMiddleware, async (req, res, next) => {
  try {
    const quizId = req.params.id;
    const userId = req.user._id;

    if (!quizId) {
      return res.status(400).json({ message: "Wrong request!" });
    }

    const quiz = await Quiz.findOne({ _id: quizId, userId });
    const allImpressions = await Result.find({ userId, quizId });

    let overallAnalytics = [];

    if (quiz.type == "qa") {
      quiz.questions.forEach((question, index) => {
        let analytics = {
          ques: question.content,
          attempted: 0,
          right: 0,
          wrong: 0,
        };

        allImpressions.forEach((imp, i) => {
          if (imp.questions[index]) {
            if (imp.questions[index].attemped) {
              analytics.attempted += 1;
              if (imp.questions[index].answered) {
                analytics.right += 1;
              } else {
                analytics.wrong += 1;
              }
            }
          }
        });

        overallAnalytics.push(analytics);
      });
    } else {
      quiz.questions.forEach((question, index) => {
        let analytics = {
          ques: question.content,
          option1: 0,
          option2: 0,
          option3: 0,
          option4: 0,
        };

        allImpressions.forEach((imp, i) => {
          if (imp.questions[index]) {
            if (imp.questions[index].attemped) {
              let selOption = imp.questions[index].selectedOption.index + 1;
              analytics[`option${selOption}`] += 1;
            }
          }
        });
        overallAnalytics.push(analytics);
      });
    }

    res.status(200).json(overallAnalytics);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
