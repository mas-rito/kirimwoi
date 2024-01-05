import { login } from "@/lib/firebase/services";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const authOption: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
    }),
  ],

  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "google") {
        const data = {
          fullname: user.name,
          email: user.email,
          image: user.image,
          maxsize: 105000000,
        };

        await login(data, (result: { status: boolean; data: any }) => {
          if (result.status) {
            token.email = result.data.email;
            token.fullname = result.data.fullname;
            token.image = result.data.image;
            token.maxsize = result.data.maxsize;
          }
        });
      }
      return token;
    },

    async session({ session, token }: any) {
      if ("email" in token) {
        session.user.email = token.email;
      }

      if ("fullname" in token) {
        session.user.fullname = token.fullname;
      }

      if ("role" in token) {
        session.user.role = token.role;
      }

      if ("image" in token) {
        session.user.image = token.image;
      }

      if ("maxsize" in token) {
        session.user.maxsize = token.maxsize;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
