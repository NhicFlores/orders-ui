'use server'
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { LoginSchema, RegisterSchema } from '@/schema/form-schema';
import bcrypt from 'bcrypt';
import { User } from '../definitions/auth-definitions';
import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';


// -------------------- Authentication ------------------ 

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    console.log("IN SERVER ACTION");

    // const validatedFields = LoginSchema.safeParse({
    //     email: formData.get('email'),
    //     password: formData.get('password'),
    // });
    //maybe create a form validation function - instead of a schemas
    //file or folder, make a schema validation file or folder. Here, we 
    //define the schema, immediately safe parse it, and return the extracted fields 
    //NOTE TEST: why does adding it here break and cause a type mismatch? 
    //NOTE TODO: form validation 
    // if (!validatedFields.success) {

    // }


    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid Credentials';//this is linked to what the login form is expecting in useFormStatus 
                // NOTE TODO: implement custom error for invalid fields defined in auth.ts 
                // case 'InvalidFieldsError':
                //     return 'Enter credentials'
                default: 
                return 'Something went wrong.';
            }
        }
        throw error;
    }

    //return { success: "user found"}; //NOTE TODO this doesn't work, it throws off the type for useFormStatus; how to change/define types expected by hooks  
}
//NOTE TODO: unused function, remove after testing 
export async function userLogin(formFields: z.infer<typeof LoginSchema>){
    console.log("------------- IN USER LOGIN ACTION ---------------");

    const validatedFields = LoginSchema.safeParse(formFields);

    if(!validatedFields.success) {
        return {
            errors: validatedFields.error?.flatten().fieldErrors,
            message: "Invalid Credentials"
        }
    }

    try {
        await signIn('credentials', validatedFields.data)
    } catch (error) {
        if (error instanceof AuthError) {
            switch(error.type) {
                case 'CredentialsSignin':
                    return 'Invalid Credentials';
                default: 
                    return 'Something went wrong';
            }
        }
        throw error;
    }
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
// this method allows us to do some more server operations 
// before the user is logged out and the session is lost 
export async function logOut(){
    console.log("------------\n------------ IN LOGOUT ACTION ------------\n------------")
    await signOut();
}