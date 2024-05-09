'use server'
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { RegisterSchema } from '@/schema/form-schema';
import bcrypt from 'bcrypt';
import { User } from '../definitions/definitions';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';


// -------------------- Authentication ------------------ 

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    console.log("IN SERVER ACTION");
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid Credentials';//this is linked to what the login form is expecting in useFormStatus 
                default: 
                    return 'Something went wrong.';
            }
        }
        throw error;
    }

    //return { success: "user found"}; //NOTE TODO this doesn't work, it throws off the type for useFormStatus; how to change/define types expected by hooks  
}




export async function registerUser(formFields: z.infer<typeof RegisterSchema>) {
    // the difference between passing (formData: FormData) and (formFields: z.infer<typeof RegisterSchema>)
    // is how we access and validate the fields 
    const validatedFields = RegisterSchema.safeParse(formFields);
    // NOTE: how is FormData something we have access to but don't explicitly pass in an action 
    // const validatedFields = RegisterSchema.safeParse({
    //     email: formData.get('email'),
    //     name: formData.get('name'),
    //     password: formData.get('password'),
    //     confirm_password: formData.get('confirm_password'),
    // })
    console.log("---------------------------- IN SERVER ACTION ---------------------------- ")
    if(!validatedFields.success){
        return {
            errors: validatedFields.error?.flatten().fieldErrors,
            message: 'Please make sure all fields are filled in'
        }
    }

    const { email, name, password, confirm_password } = validatedFields.data;

    if (!(password === confirm_password)) {
        return {
            error: "passwords do not match!" 
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await sql`
            INSERT INTO users (name, email, password)
            VALUES (${name}, ${email}, ${hashedPassword})
        `;
    } catch ( error ) {
        return {
            message: "Database Error: Failed to register new User."
        };
    }

    //NOTE TODO: redirect to log in? 
    //redirect to profile form so they can finish set up? 
    //or email verification first then they can log in? 
    //maybe I can tag the account as new if the user profile is empty 
    //so on the first time they log in, it sends them to the profile section 
    //or a little tool can jump and point to the profile button  
    return { success: 'User created! Check your email.'}
}


export async function getUser(email: string): Promise<User | undefined> {
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