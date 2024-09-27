import NextAuth from "next-auth"; //there is a User object I can import from next-auth as well
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { getUser } from "@/lib/actions/auth-actions";
import { LoginSchema } from "./schema/form-schema";

// NOTE: HOW TO create custom error for callbacks
// for more useful error codes for both client and server
// class InvalidFieldsError extends CredentialsSignin {
//     code = "empty fields"
// }

//NOTE TODO: send success message to form
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = LoginSchema.safeParse(credentials);
        // console.log("------------- PARSED CREDENTIALS ----------------");

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          // console.log("USER:", user);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          console.log("USER FOUND");
          if (passwordsMatch) return user;
        }

        //console.log('USER NOT AUTHENTICATED')
        //console.log('Invalid Credentials');
        return null;
      },
    }),
  ],
});

// export const { auth, signIn, signOut } = NextAuth({
//   ...authConfig,
//   providers: [Credentials({
//     async authorize(credentials) {
//         //const parsedCredentials = LoginSchema.safeParse(credentials);
//         console.log("------------- PARSED CREDENTIALS ----------------");

//         // if(!parsedCredentials.success){
//         //     throw new InvalidFieldsError();
//         // }

//         // if (parsedCredentials.success) {
//         //     const { email, password } = parsedCredentials.data;
//         //     const user = await getUser(email);
//         //     if (!user) return null;
//         //     const passwordsMatch = await bcrypt.compare(password, user.password);
//         //     console.log('USER FOUND')
//         //     if (passwordsMatch) return user;
//         // }

//         const { email, password } = credentials;
//         const user = await getUser(email as string);
//         if (!user) return null;
//         const passwordsMatch = await bcrypt.compare(password as string, user.password);
//         console.log('USER FOUND')
//         if (passwordsMatch) return user;

//         console.log('USER NOT AUTHENTICATED')
//         console.log('Invalid Credentials');
//         return null;
//     },
//   })],
// });
