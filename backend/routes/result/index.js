const express = require("express");
const router = express.Router();
const Result = require("../../models/Result");
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

module.exports = router;
