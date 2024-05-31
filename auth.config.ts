import type { NextAuthConfig } from "next-auth";
import { authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "./routes";
import { getUserByID } from "@/lib/data/user-data";

// You can use the pages option to specify the route for
// custom sign-in, sign-out, and error pages. This is not required,
// but by adding signIn: '/login' into our pages option, the user
// will be redirected to our custom login page, rather than the NextAuth.js default page.

//should add a custom error page to route to below signIn: '';
//include it in auth routes in routes.ts in root
export const authConfig = {
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
      const isAuthRoute = authRoutes.includes(nextUrl.pathname);
      // NOTE: isPrivate route seems unnecessary
      // NOTE: to target a whole route group use pathname.startsWith('');
      //const isOnOrder = nextUrl.pathname.startsWith('/');
      if (isAuthRoute) {
        if (isLoggedIn) {
          // if requesting an auth route, but they are logged in, redirect to default login,
          // currently set to dashboard
          return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return true; //authorized to access auth routes
      }

      if (isPublicRoute) {
        return true;
      } else if (isLoggedIn) {
        return true; //authorized to access private page requested
      }
      return false; //redirect to log in page
    },
    // NOTE TODO: signIn callback to add further conditionals on sign in
    // async signIn({ user }) {
    //     const currentUser = await getUserByID(user.id as string);

    //     if(!currentUser || !currentUser.emailVerified) {
    //         return false;
    //     }

    //     return true;
    // },
    async session({ session, token }) {
      // console.log("----------------------------------\n---------- SESSION LOGS ----------\n----------------------------------");
      // console.log({
      //     sessionToken: token,
      //     session,
      // })

      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        // console.log("TOKEN.ROLE TYPE: ------------------")
        // console.log(typeof token.role);
        session.user.role = token.role;
      }

      // console.log("-------------------------------------------\n---------- MODIFIED SESSION LOGS ----------\n-------------------------------------------");
      // console.log({
      //     sessionToken: token,
      //     session,
      // })

      return session;
    },

    async jwt({ token }) {
      //console.log("----------------------------------\n---------- TOKEN LOGS ----------\n----------------------------------");
      //console.log({ token });
      //console.log(token.role)

      if (!token.sub) return token;

      const currentUser = await getUserByID(token.sub);

      if (!currentUser) return token;

      token.role = currentUser.role;

      //token.customField = 'test';//jwt callback allows read and write of session toke property
      //any modifications made here are seen in the session callback
      return token;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
