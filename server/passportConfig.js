// const passport = require("passport");
// const db = require("./db");
// const bcrypt = require("bcrypt");
// const LocalStrategy = require("passport-local").Strategy;

// module.exports = function (passport) {
//   passport.use(
//     new LocalStrategy(
//       {
//         usernameField: "email", // This tells Passport to use 'email' as the username field
//       },
//       (email, password, done) => {
//         const search_user_query =
//           "SELECT * FROM brotrition.user WHERE email = ?";
//         db.query(search_user_query, [email], (err, result) => {
//           if (err) {
//             throw err;
//           }
//           if (result.length === 0) {
//             return done(null, false);
//           }
//           if (bcrypt.compareSync(password, result[0].password)) {
//             return done(null, result[0]);
//           } else {
//             return done(null, false);
//           }
//         });
//       }
//     )
//   );

//   passport.serializeUser((user, done) => {
//     done(null, user.userID);
//   });

//   passport.deserializeUser((id, done) => {
//     const search_user_query = "SELECT * FROM brotrition.user WHERE userID = ?";
//     db.query(search_user_query, [id], (err, result) => {
//       if (err) {
//         throw err;
//       }
//       const user_info = {
//         id: result[0].userID,
//         email: result[0].email,
//       };
//       done(null, user_info);
//     });
//   });
// };
