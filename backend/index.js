const express = require("express");
const app = express();
const { connectToDatabase } = require("./config/db");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const fs = require("fs");
const cors = require("cors");
const quizRoutes = require("./routes/quiz");
const authMiddleware = require("./middlewares/authMiddleware");
const port = process.env.PORT || 3001;

// cors
app.use(
  cors({
    origin: "*",
    exposedHeaders: "auth-token",
    "Access-Control-Allow-Headers": "*",
  })
);

// parsing the request body.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Storing requests in log.txt file
app.use((req, res, next) => {
  let log = `${req.method} - ${req.url} - ${new Date()}\n`;
  fs.appendFile("log.txt", log, (err) => {
    if (err) {
      console.log(err);
    }
  });
  next();
});

// Using routes
app.use("/auth", authRoutes);
app.use("/quiz", quizRoutes);

// error handling middleware
app.use((err, req, res, next) => {
  let log =
    `\n${req.method} - ${req.url} - ${req.ip} - ${new Date()}\n` + err.stack;
  fs.appendFile("error.txt", log, (err) => {
    if (err) {
      console.log(err);
    }
  });

  res.status(500).json({
    message: "Something went wrong on server! Try after sometime.",
    err,
  });
});

// Connnecting to mongoDB and starting the server.
connectToDatabase().then(
  (data) => {
    // Server listening on specified port.
    app.listen(port, (err) => {
      if (!err) {
        console.log(`Server is up on port ${port}.`);
      }
    });
    console.log(data);
  },
  (err) => {
    console.log(err);
  }
);
