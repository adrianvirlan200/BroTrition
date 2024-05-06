import Credentials from "next-auth/providers/credentials";
import executeQuery from "@server/db";

export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, //7days
  },
  providers: [
    Credentials({
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        const query = "SELECT * FROM brotrition.user WHERE email = ?;";
        const user = await executeQuery(query, [email]);

        //if the query executed correctly && the user exists in the db
        if (user && user.length > 0) {
          const bcrypt = require("bcrypt");
          if (bcrypt.compareSync(password, user[0].password)) {
            return {
              id: user[0].userID,
              email: user[0].email,
              username: user[0].username,
            };
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/Login",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id; // Persist the user ID in the JWT
        token.email = user.email;
        token.username = user.username;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    session: async ({ session, token, user }) => {
      if (token) {
        session.user.id = token.id; // Make the user ID available on the session object
        session.user.email = token.email;
        session.user.name = token.username;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
};
