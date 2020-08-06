require("dotenv").config();
const express = require("express");
const app = express();
const methodOverride = require("method-override");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const verifyToken = (req, res, next) => {
  let token = req.cookies.jwt;
  // COOKIE PARSER GIVES YOU A .cookies PROP, WE NAMED OUR TOKEN jwt

  console.log("Cookies: ", req.cookies.jwt);

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
    if (err || !decodedUser) {
      return res.status(401).json({ error: "Unauthorized Request" });
    }
    req.user = decodedUser;
    // ADDS A .user PROP TO REQ FOR TOKEN USER
    console.log(decodedUser);

    next();
  });
};
// Middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));

app.use("/auth", require("./controllers/authController.js"));
app.use("/trivia", require("./controllers/triviaController.js"));
app.use("/users", require("./controllers/usersController.js"));
app.use("/categories", require("./controllers/categoryController.js"));

// HOMEPAGE
app.get("/", (req, res) => {
  res.render("users/index.ejs");
});

app.listen(process.env.PORT, () => {
  console.log("Nodemon listening");
});
