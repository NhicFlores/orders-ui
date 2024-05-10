// fetch functions  
// fetch functions for users 
import { sql } from '@vercel/postgres';
import { User } from '../definitions/definitions';
import { unstable_noStore as noStore } from 'next/cache';


export async function getUser_Old(email: string) {
    // noStore();
    // NOTE what's the difference between typing the sql statement 
    // return and casting the value in the return statement 
    try {
      const user = await sql`SELECT * FROM users WHERE email=${email}`;
      return user.rows[0] as User;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw new Error('Failed to fetch user.');
    }
  }