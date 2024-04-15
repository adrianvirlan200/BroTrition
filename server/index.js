// //this file represents the middleware of the server

// const express = require("express");
// const boddParser = require("body-parser");
// const cors = require("cors");
// const passport = require("passport");
// const expressSession = require("express-session");
// const cookieParser = require("cookie-parser");
// const bcrypt = require("bcrypt");

// const db = require("./db");
// const e = require("express");

// const app = express();

// app.use(boddParser.json());
// app.use(boddParser.urlencoded({ extended: true }));
// app.use(
//   expressSession({
//     secret: "mySecretKey",
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );

// app.use(cookieParser("mySecretKey"));

// app.use(passport.initialize());
// app.use(passport.session());

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// require("./passportConfig")(passport);

// app.post("/SignUp", (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;

//   const query_insert =
//     "INSERT INTO brotrition.user (email, password) VALUES (?, ?)";
//   const query_verify = "SELECT * FROM brotrition.user WHERE email = ?";

//   //todo send back a json file

//   db.query(query_verify, [email], (err, result) => {
//     if (err) {
//       throw err;
//     }
//     if (result.length > 0) {
//       res.send({ message: "User already exists" });
//     }
//     if (result.length === 0) {
//       const hashedPassword = bcrypt.hashSync(password, 10);

//       // We can now insert the user data into the db
//       db.query(query_insert, [email, hashedPassword], (err, result) => {
//         if (err) {
//           throw err;
//         }
//         res.send({ message: "User registered" });
//       });
//     }
//   });
// });

// app.post("/LogIn", (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       return res.send("No user exists");
//     }
//     req.login(user, (err) => {
//       if (err) {
//         return next(err);
//       }
//       return res.redirect("/Home");
//     });
//   })(req, res, next);
// });

// app.get("/Home", (req, res) => {
//   req.logout(function (err) {
//     if (err) {
//       return next(err); // Handle error if any
//     }
//     // Redirect the user after successfully logging out
//     res.redirect("/login");
//   });
// });

// // Protect the /WelcomePage route
// app.get("/Home/*", (req, res, next) => {
//   if (req.isAuthenticated()) {
//     // Your route logic here
//     res.send("Welcome");
//   } else {
//     res.redirect("/");
//   }
// });

// app.get("/Home", (req, res) => {
//   res.send(req.user);
// });

// app.listen(3001, () => {
//   console.log("Server is running on port 3001");
// });
