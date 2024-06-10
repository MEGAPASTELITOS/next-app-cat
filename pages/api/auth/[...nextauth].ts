import axios from "@/lib/axios";
import NextAuth, { AuthOptions, User, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Tokens, Users } from "../../../types/types";
import { jwtDecode } from "jwt-decode";

async function refreshToken(token: any) {
  const {data} = await axios.post("/auth/refresh",{},{
    headers:{ 
      "Authorization":`Bearer ${token.refreshToken}`
    }
  })

  return {
    ...token,
    accessToken: data.accessToken,
    accessTokenExpires: jwtDecode(data?.accessToken).exp * 1000 ?? 0,
  };
}

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
            ...user,
            accessTokenExpires: jwtDecode(tokens.accessToken).exp * 1000,
          };
        } else {
          throw new Error("Internal Server Error");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
    if(user) {
        return { ...token, ...user };
    }

      if (Date.now() < token.accessTokenExpires) {
        console.log("no refresh token...")
        return token
      }
      console.log("refresh token...")
      return refreshToken(token)
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);  