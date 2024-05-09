import NextAuth from 'next-auth'; //there is a User object I can import from next-auth as well 
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { User } from './app/lib/definitions/definitions';
import bcrypt from 'bcrypt';

async function getUser(email: string): Promise<User | undefined> {
    console.log("IN AUTH - getUser()")
    try {
        const user = await sql<User>`
            SELECT * FROM users 
            WHERE email=${email}
        `;
        return user.rows[0];
    } catch (error) {
        console.error('Failed to fetch user: ', error);
        throw new Error('Failed to fetch user.');
    }
}
//NOTE TODO: send success message to form 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [Credentials({
    async authorize(credentials) {
        const parsedCredentials = z
            .object({ email: z.string().email(), password: z.string().min(6) })
            .safeParse(credentials);

        if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;
            const user = await getUser(email);
            if (!user) return null;
            const passwordsMatch = await bcrypt.compare(password, user.password);
            console.log('USER FOUND')
            if (passwordsMatch) return user;
        }
        console.log('USER NOT AUTHENTICATED')
        console.log('Invalid Credentials');
        return null;
    },
  })],
});