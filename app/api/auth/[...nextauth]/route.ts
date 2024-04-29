import NextAuth, {
  AuthOptions,
  NextAuthOptions,
  SessionStrategy,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Authentication failed");

        console.log("Data received in authorize:", data);

        return {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          surname: data.user.surname,
          accessToken: data.token,
        };
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.surname = user.surname;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        surname: token.surname,
      };
      session.accessToken = token.accessToken;

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
