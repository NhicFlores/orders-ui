import type { NextAuthConfig } from 'next-auth';
import { Login } from './app/lib/routes';
import { DEFAULT_LOGIN_REDIRECT } from './routes';

// You can use the pages option to specify the route for 
// custom sign-in, sign-out, and error pages. This is not required, 
// but by adding signIn: '/login' into our pages option, the user 
// will be redirected to our custom login page, rather than the NextAuth.js default page.

// NOTE TODO: protected route logic
export const authConfig = {
    pages: {
        signIn: '/auth/login',
    },
    callbacks: {
        authorized({ auth, request : {nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnOrder = nextUrl.pathname.startsWith('/');
            if (isOnOrder) {
                return true;
                //if (isLoggedIn) return true;
                //return false; // redirect unauthenticated users to login page 
            } 
            else if (isLoggedIn) {
                return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));//NOTE TODO: protected routes  
            }
            return true;
        },
    }, providers: [],
} satisfies NextAuthConfig;
