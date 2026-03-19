import {PrismaAdapter} from "@auth/prisma-adapter";
import {prisma} from "@/prisma/prisma-client";
import {getUserById} from "@/data/user";
import NextAuth from "next-auth";
import authConfig from "@/configs/auth.config";

export const {
  handlers: {GET, POST},
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async signIn({user, account}) {
      // пропускаем сразу, если вход через гугл
      if (account?.provider !== "credentials") return true;

      console.log("DEBUG: Checking user in signIn callback:", user.id);

      const existingUser = await getUserById(user.id ?? "");

      console.log("DEBUG: existingUser from DB:", existingUser);

      if (!existingUser?.emailVerified) {
        console.log("DEBUG: Access Denied because emailVerified is null/undefined");
        return false;
      }

      return true;
    },
    async session({token, session}) {
      // console.log("token in session", token);
      // console.log("session in session", session);
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          isOAuth: token.isOauth,
        },
      };
    },
    async jwt({token}) {
      // вызывается каждый раз, когда пользователь запрашивает страницу или обновляет сессию
      // token.sub - ID пользователя в NextAuth
      // console.log("token in jwt", token);
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;
      token.name = existingUser.name;
      token.email = existingUser.email;

      return token;
    },
  },
  ...authConfig,
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  //   pages: {
  //     signIn: '/signin',
  //     error: '/error', // Error code passed in query string as ?error=
  //     verifyRequest: '/verify-request', // (used for check email message)
  //     // newUser: '/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  //     // signOut: '/signout',
  //   },
});