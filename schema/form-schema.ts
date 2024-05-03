import { z } from "zod";

//NOTE TODO: email validation, phone number validation - regex might work
//nested object schema with z.record
//add schema objects for address, shipping info, and billing info 
//NOTE TODO: create corresponding sql table - update users 
export const ProfileSchema = z.object({
    name: z.string({
        invalid_type_error: 'Please enter your name'
    }),
    email: z.string().email({
        message: "This is not a valid emaill address."
    }),
    phone_num: z.string({
        invalid_type_error: 'please enter a valid phone number.'
    }),
    billing_info: z.object({
        billing_addr: z.string({
            invalid_type_error: 'enter valid street address'
        }),
        payment_method: z.string({
            invalid_type_error: 'select payment method'
        }),
    }),
    shipping_info: z.object({
        delivery_addr: z.string({
            invalid_type_error: 'Please enter a valid street address.'
        }),
    }),
});

export const LoginSchema = z.object({
    email: z.string().email({
        message: 'please enter a valid email address'
    }),
    password: z.string().min(6, {
        message: 'password must be at least 6 characters long'
    }),
})

export const RegisterSchema = z.object({
    email: z.string().email({
        message: 'please enter a valid email address'
    }),
    name: z.string().min(1, {
        message: 'please enter your name'
    }),
    password: z.string().min(6, {
        message: 'password must be at least 6 characters long'
    }),
    confirm_password: z.string().min(6, {
        message: "passwords don't match"
    }),
})