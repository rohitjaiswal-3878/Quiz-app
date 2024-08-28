const express = require("express");
const router = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/User");

// Route for registering the user.
router.post("/register", async (req, res, next) => {
  try {
    // Getting data from body and checking whether user already exists or not.
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // Hashing the password before storing it in database.
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Creating new user and storing it in database.
    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(200).json({ message: "User registered successfully!" });
  } catch (err) {
    next(err);
  }
});

// Route for Logging in.
router.post("/login", async (req, res, next) => {
  try {
    // Getting data and checking whether user exists in DB or not.
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Wrong email or password!" });
    }

    // Validating the password
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      res.status(400).json({ message: "Wrong email or password!" });
    } else {
      // creating authentication token
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
      res
        .setHeader("auth-token", token)
        .json({ message: "Logged in successfully!", name: user.name });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
