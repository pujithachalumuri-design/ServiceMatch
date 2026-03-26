const express = require("express");
const path = require("path");
const session = require("express-session");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
  secret: "servicematchsecret",
  resave: false,
  saveUninitialized: false
}));

app.use("/", require("./routes/auth"));
app.use("/", require("./routes/worker"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

if (process.env.NODE_ENV !== "production") {
  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
}

// Export the Express API for Vercel Serverless Function
module.exports = app;
