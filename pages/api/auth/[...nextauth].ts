import axios from "@/lib/axios";
import NextAuth, { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Tokens, Users } from "../../../types/types";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith@gmail.com", value:"megapastelitos@gmail.com" },
        password: { label: "Password", type: "password",value:"megapastel" },
      },
      async authorize(credentials, req) {

        const res = await axios.post("/auth/signin",{
          email: credentials?.email,
          password: credentials?.password,
        })

        const tokens:Tokens = await res.data;

        if (tokens) {
          const {data} = await axios.post("/auth/profile",{},{
            headers:{
              "Authorization":`Bearer ${tokens.accessToken}`
            }
          })

          const user:Users = data.users
          return {
            ...tokens,
            ...user
          };
        } else {
          throw new Error("Internal Server Error");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log(user)
      console.log(token)
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },
};
export default NextAuth(authOptions); 