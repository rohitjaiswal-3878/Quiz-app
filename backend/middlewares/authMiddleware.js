const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

// It authenticates the user request using token.
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("token");
    console.log(token);
    if (!token) {
      return res.status(400).json({ message: "Access forbidden!" });
    } else {
      const verified = await jwt.verify(token, process.env.TOKEN_SECRET);
      if (verified) {
        const user = await User.findOne({ _id: verified._id });
        if (user) {
          req.user = user;
          next();
        } else {
          return res.status(400).json({ message: "Access forbidden!" });
        }
      } else {
        return res.status(400).json({ message: "Access forbidden!" });
      }
    }
  } catch (err) {
    next(err);
  }
};

module.exports = authMiddleware;
