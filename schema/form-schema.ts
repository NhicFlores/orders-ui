import { z } from "zod";

//NOTE TODO: email validation, phone number validation - regex might work
export const UserSchema = z.object({
    email: z.string().email({
        message: 'please enter a valid email address'
    }),
    name: z.string().min(1, {
        message: 'please enter your name'
    }),
});

export const ProfileSchema = z.object({
    company: z.string({
        invalid_type_error: 'Please enter your name'
    }).optional(),
    account_num: z.string({
        invalid_type_error: 'Please enter your account number'
    }),
    phone_num: z.string({
        invalid_type_error: 'please enter a valid phone number.'
    }),
});

export const BillingInfoSchema = z.object({
    billing_addr_prim: z.object({
      city: z.string(
        {
          invalid_type_error: 'Please choose a city.'
        }
      ),
      state: z.string(
        {
          invalid_type_error: 'Please choose a state.'
        }
      ),
      zip: z.string().length(5),
      county: z.string().optional(),
      country: z.string(),
    }),
    billing_addr_sec: z.object({
      city: z.string(),
      state: z.string(),
      zip: z.string().length(5),
      county: z.string().optional(),
      country: z.string(),
    }).optional(),
    payment_method: z.string(),
    purchase_order: z.string(),
    additional_info: z.string().optional(),
    primary_contact_name: z.string(),
    primary_contact_email: z.string().email(),
    phone_num: z.string(),
    alt_phone_num: z.string().optional(),
    fax_num: z.string().optional(),
  });

export const ShippingInfoSchema = z.object({
    delivery_addr: z.object({
        city: z.string(),
        state: z.string(),
        zip: z.string().length(5),
        county: z.string().optional(),
        country: z.string(),
      }),
    is_job_site: z.boolean(),
    note: z.string({
        invalid_type_error: 'enter note'
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