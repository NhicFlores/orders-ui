import type { NextAuthConfig } from 'next-auth';
import { Login } from './app/lib/routes';

// You can use the pages option to specify the route for 
// custom sign-in, sign-out, and error pages. This is not required, 
// but by adding signIn: '/login' into our pages option, the user 
// will be redirected to our custom login page, rather than the NextAuth.js default page.

export const authConfig = {
    pages: {
        signIn: Login.href,
    },
    callbacks: {
        authorized({ auth, request : {nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnHome = nextUrl.pathname.startsWith('/');
            if (isOnHome) {
                if (isLoggedIn) return true;
                return false; // redirect unauthenticated users to login page 
            } 
            else if (isLoggedIn) {
                return Response.redirect(new URL('/', nextUrl));
            }
            return true;
        },
    }, providers: [],
} satisfies NextAuthConfig;