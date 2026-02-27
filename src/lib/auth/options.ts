import { PrismaAdapter } from "@auth/prisma-adapter";
import { type NextAuthOptions, type DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: 'Test Account',
      credentials: {},
      async authorize(credentials) {
        // Mock a user for local MVP testing
        let user = await prisma.user.findUnique({
          where: { email: 'admin@retain.io' }
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              email: 'admin@retain.io',
              name: 'Demo Admin',
            }
          });
        }

        return { id: user.id, name: user.name, email: user.email };
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        if (token.sub) {
          session.user.id = token.sub;
        }
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
};
