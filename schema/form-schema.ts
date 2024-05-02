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