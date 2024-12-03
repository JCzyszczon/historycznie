import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

interface User {
  id: string;
  role: string;
}

/*export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "Email",
          placeholder: "hello@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/signin`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }
        );

        const user = await res.json();

        if (res.ok && user) {
          return user;
        } else {
          throw new Error(user?.message || "Błąd logowania");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/logowanie",
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        if (!profile?.email) {
          throw new Error("Brak profilu.");
        }

        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google-login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: profile.email,
                name: profile.name,
              }),
            }
          );

          if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage || "Nie udało się zalogować.");
          }

          const userData = await response.json();

          account.user = userData;
          return true;
        } catch (error) {
          console.error("Błąd logowania z Google:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (account?.provider === "google" && account.user) {
        return {
          ...token,
          id: account?.user?.id,
          role: account?.user?.role,
        };
      }

      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
        };
      }

      return token;
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
        },
      };
    },
  },
};*/

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "Email",
          placeholder: "hello@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/signin`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }
        );

        const user = await res.json();

        if (res.ok && user) {
          return user;
        } else {
          throw new Error(user?.message || "Błąd logowania");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/logowanie",
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        if (!profile?.email) {
          throw new Error("Brak profilu.");
        }

        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google-login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: profile.email,
                name: profile.name,
              }),
            }
          );

          if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage || "Nie udało się zalogować.");
          }

          const userData = await response.json();

          account.user = userData;
          return true;
        } catch (error) {
          console.error("Błąd logowania z Google:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (account?.provider === "google" && account.user) {
        const accountUser = account.user as User;
        return {
          ...token,
          id: accountUser.id,
          role: accountUser.role,
        };
      }

      if (user) {
        const userWithRole = user as User;
        return {
          ...token,
          id: userWithRole.id,
          role: userWithRole.role,
        };
      }

      return token;
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
        },
      };
    },
  },
};
