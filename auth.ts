import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.password) return null;

        const storedHash = process.env.ADMIN_PASSWORD_HASH;
        if (!storedHash) {
          console.error("ADMIN_PASSWORD_HASH is not set in environment variables");
          return null;
        }

        const isMatch = await bcrypt.compare(
          credentials.password as string,
          storedHash
        );

        if (isMatch) {
          return { id: "admin", name: "Admin" };
        }

        return null;
      },
    }),
  ],
});

