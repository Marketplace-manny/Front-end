import NextAuth, { AuthOptions, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error(
    "JWT_SECRET is not defined. Please define it in your environment variables."
  );
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        token: {
          label: "Token",
          type: "text",
          placeholder: "Enter your token here",
        },
      },
      async authorize(credentials) {
        const token = credentials?.token;
        try {
          if (token) {
            // Verify the token and assert the type
            const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

            // Check if decoded is an object and has the property 'id'
            if (typeof decoded === "object" && decoded.hasOwnProperty("id")) {
              return {
                id: decoded.id, // TypeScript now knows `decoded.id` is accessible
                name: decoded.name,
                surname: decoded.surname,
                email: decoded.email,
                token: token, // Storing the original token if needed elsewhere
              };
            }
          }
        } catch (error) {
          throw new Error("Token validation failed: " + error);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }: { token: any; user: any }) => {
      // Assign new claims to the token only if `user` exists (on sign in)
      if (user) {
        token.accessToken = user.token;
        token.id = user.id;
        token.name = user.name;
        token.surname = user.surname;
        token.email = user.email;
      }
      return token;
    },
    session: async ({ session, token }) => {
      // Add these fields to the session object
      session.user = {
        ...session.user, // Preserve existing session properties
        id: token.id,
        name: token.name,
        surname: token.surname,
        email: token.email,
        accessToken: token.accessToken, // You might also want to access the token later
      };
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
