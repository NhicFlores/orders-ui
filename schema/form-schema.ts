import { z } from "zod";

// TODO NOTE: email validation, phone number validation - regex might work
export const UserSchema = z.object({
  email: z.string().email({
    message: "please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "password must be at least 6 characters long",
  }),
});

export const ProfileSchema = z.object({
  first_name: z.string().min(1, {
    message: "please enter your first name",
  }),
  last_name: z.string().min(1, {
    message: "please enter your last name",
  }),
  phone_num: z.string({
    invalid_type_error: "please enter a valid phone number.",
  }),
});

export const BillingInfoSchema = z.object({
  street: z.string(),
  apt_num: z.string().nullable(),
  city: z.string(),
  state: z.string({
    invalid_type_error: "Please choose a state.",
  }),
  zip: z.string().length(5),
  payment_method: z.string(),
  purchase_order: z.string(),
  primary_contact_name: z.string(),
  primary_contact_email: z.string().email(),
  primary_contact_phone: z.string(),
  fax_num: z.string().nullable(),
});

export const ShippingInfoSchema = z.object({
  street: z.string(),
  apt_num: z.string().nullable(),
  city: z.string(),
  state: z.string(),
  zip: z.string().length(5),
  is_job_site: z.boolean(),
  note: z
    .string().nullable(),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "please enter a valid email address",
  }),
  password: z.string().min(5, {
    message: "password must be at least 6 characters long",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "password must be at least 6 characters long",
  }),
  confirm_password: z.string().min(6, {
    message: "passwords don't match",
  }),
});

export const RequiredDimensionsSchema = z.object({
  radius: z
    .object({
      label: z.string(),
      value: z.string().min(1),
    })
    .optional(),
  offset: z
    .object({
      label: z.string(),
      value: z.string().min(1),
    })
    .optional(),
  edge_length: z
    .object({
      label: z.string(),
      value: z.string().min(1),
    })
    .optional(),
  base: z
    .object({
      label: z.string(),
      value: z.string().min(1),
    })
    .optional(),
  height: z
    .object({
      label: z.string(),
      value: z.string().min(1),
    })
    .optional(),
  sub_height: z
    .object({
      label: z.string(),
      value: z.string().min(1),
    })
    .optional(),
  left_sub_height: z
    .object({
      label: z.string(),
      value: z.string().min(1),
    })
    .optional(),
  right_sub_height: z
    .object({
      label: z.string(),
      value: z.string().min(1),
    })
    .optional(),
  top: z
    .object({
      label: z.string(),
      value: z.string().min(1),
    })
    .optional(),
  left_projection: z
    .object({
      label: z.string(),
      value: z.string().min(1),
    })
    .optional(),
  right_projection: z
    .object({
      label: z.string(),
      value: z.string().min(1),
    })
    .optional(),
});

export const OrderSchema = z.object({
  order_id: z.string(),
  created_by: z.string(),
  customer_id: z.string(),
  order_name: z.string(),
  order_number: z.string(),
  shipping_data: ShippingInfoSchema,
  billing_data: BillingInfoSchema,
  status: z.string(),
  amount: z.number(),
  date_created: z.date(),
  date_updated: z.date(),
  date_submitted: z.date(),
  date_shipped: z.date().optional(),
  date_delivered: z.date().optional(),
});

export const CreateOrder = OrderSchema.omit({
  order_id: true,
  created_by: true,
  date_created: true,
  date_updated: true,
  date_submitted: true,
});

export const OrderItemSchema = z.object({
  id: z.string(),
  order_id: z.string(),
  glassType: z.string(),
  shape: z.string(),
  dimensions: z.string(),
  thickness: z.string(),
  tint: z.string(),
  fabrication_options: z.string().optional(),
  misc_options: z.string().optional(),
  note: z.string(),
  quantity: z.number(),
});
// TODO NOTE: CREATE FORM SCHEMA FOR INVOICE, ORDER, AND CUSTOMER DETAILS PAGES
export const OrderInvoiceSchema = z.object({
  invoice_number: z.string().optional(),
  status: z.string(),
  amount: z.number(),
});

// IMPLEMENTATION NOTE: the date fields don't have to be part of the schema unless
// users are allowed to enter dates
export const OrderDetailSchema = z.object({
  created_by: z.string(),
  order_name: z.string(),
  order_number: z.string(),
  shipping_data: ShippingInfoSchema,
  billing_data: BillingInfoSchema,
  status: z.string(),
  amount: z.number(),
  date_submitted: z.date().nullable(),
  date_shipped: z.date().nullable(),
  date_delivered: z.date().nullable(),
});
