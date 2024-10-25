import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Role } from "@/lib/definitions/data-model";

/**
 * modul extension to add additional properties to Session and JWT 
 */
declare module "next-auth" {
    /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
    interface Session {
        user: {
            role: Role
        } & DefaultSession["user"]
    }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        /**
         * user Role: 'USER' | 'ADMIN'  
         * @type {Role}
         */
        role: Role
    }
}