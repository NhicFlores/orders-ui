import { OrderStatus } from "@/lib/data-model/data-definitions";
import { stat } from "fs";
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
  company: z
    .string({
      invalid_type_error: "Please enter your name",
    })
    .optional(),
  account_num: z.string({
    invalid_type_error: "Please enter your account number",
  }),
  phone_num: z.string({
    invalid_type_error: "please enter a valid phone number.",
  }),
});

export const BillingInfoSchema = z.object({
  street: z.string(),
  apt_num: z.string().optional(),
  city: z.string(),
  state: z.string({
    invalid_type_error: "Please choose a state.",
  }),
  zip: z.string().length(5),
  payment_method: z.string(),
  purchase_order: z.string().optional(),
  primary_contact_name: z.string(),
  primary_contact_email: z.string().email(),
  primary_contact_phone: z.string(),
  fax_num: z.string().optional(),
});

export const ShippingInfoSchema = z.object({
  street: z.string(),
  apt_num: z.string().optional().nullable(),
  city: z.string(),
  state: z.string(),
  zip: z.string().length(5),
  is_job_site: z.boolean().optional(),
  note: z
    .string({
      invalid_type_error: "enter note",
    })
    .optional(),
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
  status: z.nativeEnum(OrderStatus, {
    invalid_type_error: "Please select an order status.",
  }),
  amount: z.number(),
  date_created: z.string(),
  date_updated: z.string(),
  date_submitted: z.string(),
  date_shipped: z.string().optional(),
  date_delivered: z.string().optional(),
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
  status: z.nativeEnum(OrderStatus),
  amount: z.number(),
})

export const OrderDetailSchema = z.object({
  order_id: z.string(),
  created_by: z.string(),
  customer_id: z.string(),
  order_name: z.string(),
  order_number: z.string(),
  shipping_data: ShippingInfoSchema,
  billing_data: BillingInfoSchema,
  status: z.nativeEnum(OrderStatus, {
    invalid_type_error: "Please select an order status.",
  }),
  amount: z.number(),
  date_created: z.string(),
  date_updated: z.string(),
  date_submitted: z.string(),
  date_shipped: z.string().optional(),
  date_delivered: z.string().optional(),
  invoice_number: z.string().optional(),
})
