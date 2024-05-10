import type { NextAuthConfig } from 'next-auth';
import { authRoutes, DEFAULT_LOGIN_REDIRECT, privateRoutes, publicRoutes } from './routes';

// You can use the pages option to specify the route for 
// custom sign-in, sign-out, and error pages. This is not required, 
// but by adding signIn: '/login' into our pages option, the user 
// will be redirected to our custom login page, rather than the NextAuth.js default page.

export const authConfig = {
    pages: {
        signIn: '/auth/login',
    },
    callbacks: {
        authorized({ auth, request : {nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
            const isAuthRoute = authRoutes.includes(nextUrl.pathname)
            // NOTE: isPrivate route seems unnecessary 
            // NOTE: to target a whole route group use pathname.startsWith(''); 
            //const isOnOrder = nextUrl.pathname.startsWith('/');
            if (isAuthRoute) {
                if(isLoggedIn) {
                    // if requesting an auth route, but they are logged in, redirect to default login, 
                    // currently set to dashboard 
                    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
                }
                return true;//authorized to access auth routes 
            } 

            if(isPublicRoute){
                return true;
            }

            else if (isLoggedIn) {
                return true;  //authorized to access private page requested 
            }
            return false;//redirect to log in page  
        },
    }, providers: [],
} satisfies NextAuthConfig;
