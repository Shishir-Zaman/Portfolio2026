// middleware.ts — runs on Edge Runtime
// IMPORTANT: Only import from auth.config.ts here, NOT from auth.ts
// auth.ts imports bcryptjs which is a Node.js-only module and will crash the Edge Runtime.
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // Match all routes except Next.js internals and static files
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
