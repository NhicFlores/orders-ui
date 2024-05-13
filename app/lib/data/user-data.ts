// fetch functions  
// fetch functions for users 
import { sql } from '@vercel/postgres';
import { User } from '@/app/lib/definitions/auth-definitions';
import { unstable_noStore as noStore } from 'next/cache';


export async function getUserByID(id: string) {
    // noStore();
    // NOTE what's the difference between typing the sql statement 
    // return and casting the value in the return statement 
    try {
      const user = await sql<User>`SELECT * FROM users WHERE id=${id}`;
      return user.rows[0];//as User 
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw new Error('Failed to fetch user.');
    }
  }