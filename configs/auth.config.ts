import {NextAuthConfig} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import {getUserByEmail} from "@/data/user";
import {LoginSchema} from "@/schemas";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedCredentials = LoginSchema.safeParse(credentials)

        if (!validatedCredentials.success) {
          return null;
        }

        const {email, password} = validatedCredentials.data;
        //  console.log("password", password)

        const user = await getUserByEmail(email);
        if (!user || !user.password) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);
        // console.log("passwordsMatch", passwordsMatch);

        if (passwordsMatch) {
          return user;
        }

        return null;
      }
    })
  ]
} satisfies NextAuthConfig;