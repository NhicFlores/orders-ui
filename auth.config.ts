import type { NextAuthConfig } from 'next-auth';
import { authRoutes, DEFAULT_LOGIN_REDIRECT, privateRoutes, publicRoutes } from './routes';

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
            const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
            const isAuthRoute = authRoutes.includes(nextUrl.pathname)
            const isPrivateRoute = privateRoutes.includes(nextUrl.pathname)
            //const isOnOrder = nextUrl.pathname.startsWith('/');
            if(isPublicRoute){
                return true;
            }

            if (isAuthRoute) {
                if(isLoggedIn) {
                    //if requesting an auth route, but they are logged in, redirect to default login, currently set to dashboard 
                    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
                }
                return true;//authorized to access page requested 
                //if (isLoggedIn) return true;
                //return false; // redirect unauthenticated users to login page 
            } 
            else if (isPrivateRoute && isLoggedIn) {
                return true;  
            }
            return false;//authorized to access route requested 
        },
    }, providers: [],
} satisfies NextAuthConfig;
