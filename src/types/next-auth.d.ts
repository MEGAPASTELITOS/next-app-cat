import NextAuth from "next-auth";
import { Role } from "./enum";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id: number;
      userName: string;
      name: string;
      email: string;
      role: Role;
      accessToken: string;
      refreshToken: string;
    };
  }
}
