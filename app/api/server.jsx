const express = require("express");
const boddParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const db = require("../../../brotrition/app/api/db");

const app = express();

app.use(boddParser.json());
app.use(boddParser.urlencoded({ extended: true }));
app.use(
  expressSession({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.post("/SignUp", (req, res) => {
  const { email, password } = req.body;

  const query_insert = "INSERT INTO users (email, password) VALUES (?, ?)";
  const query_verify = "SELECT * FROM users WHERE email = ?";

  // Firstly, check if the user already exists in the db
  db.query(query_verify, [username], (err, result) => {
    if (err) {
      throw err;
    } else if (result.length === 0) {
      const hashedPassword = bcrypt.hashSync(password, 10);

      // We can now insert the user data into the db
      db.query(query, [username, hashedPassword], (err, result) => {
        if (err) {
          throw err;
        }
        res.send({ message: "User registered" });
      });
    }
  });
});

app.use(cookieParser("mySecretKey"));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
