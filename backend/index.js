const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Server listening on specified port.
app.listen(port, (err) => {
  if (!err) {
    console.log(`Server is up on port ${port}.`);
  }
});
