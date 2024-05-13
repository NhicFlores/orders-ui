import NextAuth, { DefaultSession } from "next-auth";
import { Role } from "@/app/lib/definitions/auth-definitions";

//NOTE TODO: add role 
declare module "next-auth" {
    interface Session {
        user: {
            role: Role
        } & DefaultSession["user"]
    }
}