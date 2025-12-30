import { NextAuthOptions } from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as any,
    providers: [
        // Email/Password authentication
        credentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) { 
                if (!credentials?.email || !credentials?.password) {
                    // return null; 
                    throw new Error("Email and password are required");
                }

                const user = await prisma.user.findUnique({
                    where: {email: credentials.email}
                });
                if(!user || !user.password) {
                    throw new Error("No user found with the given email");
                }

                const isValid = await bcrypt.compare(credentials.password, user.password);
                if(!isValid) {
                    throw new Error("Password does not match");   
                }
                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                };
            }
        }),

        //  Optional: Google 0Auth
        // GoogleProvider({
        //     clientId: 
        // }),

    ],
    session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
   callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}