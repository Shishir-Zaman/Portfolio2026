// auth.config.ts — Edge-safe config (no Node.js-only modules like bcrypt)
// This is imported by middleware.ts which runs on the Edge Runtime.
import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      const isOnLogin = nextUrl.pathname === "/admin/login";

      if (isOnAdmin) {
        if (isOnLogin) {
          // If already logged in, redirect away from login page
          if (isLoggedIn) return Response.redirect(new URL("/admin", nextUrl));
          return true; // Allow access to login page
        }
        // Protect all other /admin/* routes
        if (!isLoggedIn) return false;
      }
      return true;
    },
  },
  providers: [], // Providers are added in auth.ts (Node.js runtime only)
};

