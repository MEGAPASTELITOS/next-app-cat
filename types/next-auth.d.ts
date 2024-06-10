import NextAuth from "next-auth";
import { Role } from "./enum";
import { UserWindTokens } from "./types";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: JWT
  }
  interface JWT { 
    id: number;
    userName: string;
    name: string;
    email: string;
    role: Role;
    createdAt: Date
    updatedAt: Date
    accessToken: string;
    refreshToken: string;
  } 
}

