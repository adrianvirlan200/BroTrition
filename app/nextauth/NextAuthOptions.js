import Credentials from "next-auth/providers/credentials";
import executeQuery from "./MySqlConnect";

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

        const query =
          "SELECT * FROM brotrition.user WHERE email = ? and password = ?;";

        const user = await executeQuery(query, [email, password]);

        //if the query executed correctly && the user exists in the db
        if (user && user.length > 0)
          return {
            Id: 1,
            email: email,
            userName: "student",
          };
        else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true; // Return true if sign-in is allowed, otherwise false
    },
    async redirect({ url, baseUrl }) {
      // Check if the redirection is after sign-in or sign-out
      if (url.startsWith(baseUrl + "/api/auth/signout")) {
        // Redirect to '/' after sign-out
        return "/";
      }
      // Redirect to '/Home' after sign-in
      return "/Home";
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id; // Persist the user ID in the JWT
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.id = token.id; // Make the user ID available on the session object
      }
      return session;
    },
  },
};
