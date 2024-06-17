import { z } from "zod";

//NOTE TODO: email validation, phone number validation - regex might work
export const UserSchema = z.object({
    email: z.string().email({
        message: 'please enter a valid email address'
    }),
    password: z.string().min(6, {
        message: 'password must be at least 6 characters long'
    }),
});

export const ProfileSchema = z.object({
    name: z.string().min(1, {
        message: 'please enter your name'
    }),
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
    billing_addr: z.object({
        street: z.string(),
        apt_num: z.string().optional(),
      city: z.string(),
      state: z.string(
        {
          invalid_type_error: 'Please choose a state.'
        }
      ),
      zip: z.string().length(5),
      country: z.string(),
    }),
    payment_method: z.string(),
    purchase_order: z.string().optional(),
    primary_contact_name: z.string(),
    primary_contact_email: z.string().email(),
    phone_num: z.string(),
    alt_phone_num: z.string().optional(),
    fax_num: z.string().optional(),
  });

export const ShippingInfoSchema = z.object({
    delivery_addr: z.object({
        street: z.string(),
        apt_num: z.string().optional(),
        city: z.string(),
        state: z.string(),
        zip: z.string().length(5),
        country: z.string(),
      }),
    is_job_site: z.boolean(),
    note: z.string({
        invalid_type_error: 'enter note'
    }).optional(),
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
    password: z.string().min(6, {
        message: 'password must be at least 6 characters long'
    }),
    confirm_password: z.string().min(6, {
        message: "passwords don't match"
    }),
})

export const RequiredDimensionsSchema = z.object({
    radius: z.object({
        label: z.string(),
        value: z.string().min(1),
    }).optional(),
    offset: z.object({
        label: z.string(),
        value: z.string().min(1),
    }).optional(),
    edge_length: z.object({
        label: z.string(),
        value: z.string().min(1),
    }).optional(),
    base: z.object({
        label: z.string(),
        value: z.string().min(1),
    }).optional(),
    height: z.object({
        label: z.string(),
        value: z.string().min(1),
    }).optional(),
    sub_height: z.object({
        label: z.string(),
        value: z.string().min(1),
    }).optional(),
    left_sub_height: z.object({
        label: z.string(),
        value: z.string().min(1),
    }).optional(),
    right_sub_height: z.object({
        label: z.string(),
        value: z.string().min(1),
    }).optional(),
    top: z.object({
        label: z.string(),
        value: z.string().min(1),
    }).optional(),
    left_projection: z.object({
        label: z.string(),
        value: z.string().min(1),
    }).optional(),
    right_projection: z.object({
        label: z.string(),
        value: z.string().min(1),
    }).optional(),
});