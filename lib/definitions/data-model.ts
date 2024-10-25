export type User = {
  id: string;
  email: string;
  password: string;
  role: Role;
};

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export type UserProfile = {
  id: number;
  user_id: string;
  first_name: string;
  last_name: string;
  company?: string;
  account_num?: string;
  phone_num?: string;
};

export type UserShippingInformation = {
  id?: number;
  user_id?: string;
  street: string;
  apt_num?: string;
  city: string;
  state: string;
  zip: string;
  is_job_site: boolean;
  note: string;
};

export type UserBillingInformation = {
  id: number;
  user_id: string;
  street: string;
  apt_num?: string;
  city: string;
  state: string;
  zip: string;
  payment_method: string;
  // payment_info: string; // stringified json object
  purchase_order: string;
  primary_contact_name: string;
  primary_contact_email: string;
  primary_contact_phone: string;
  fax_num: string;
  is_primary: boolean;
  is_active: boolean;
};

// used when generating billing info for orders 
export const payment_method_codes = [
  "CREDIT",
  "DEBIT",
  "PURCHASE ORDER",
  "CASH",
  "CHECK",
];
// NOTE: could turn this into payment info object
// in schema, this would be a column in billing info table
// with jsonb type
// export type PaymentMethod = {
//   type: string;
// };

export type Product = {
  id: string;
  type: string;
  image_url: string;
  alt: string;
  description: string;
  config_options: any;
  // unit price, eventually need to work in unit of measure
  // price: number;
  // unit:
  date_created: Date;
  date_updated: Date;
};

export type GlassInventoryItem = {
  id: string;
  name: string;
  description: string;
  thickness: string[];
  shapes: string[];
  tint: string[];
  compatible_products: string[];
  quantity_available: number;
  // supplier_id: string;
  quantity_incoming: quantityIncoming; // jsonb
  date_created: Date;
  date_updated: Date;
  updated_by: string;
};

// NOTE TODO:
// shape, stock sheets, and different processes may have different min and max values
// for length and width so check each part of config, and offer user option based on
// the largest min smallest max across all parts of configuration

interface quantityIncoming {
  quantity_incoming: number;
  restock_order_id: string;
  supplier_id: string;
  expected_arrival_date: Date;
}
// front-end only
export enum OrderStatus {
  /** Saved by the user but not yet submitted. */
  Draft = "DRAFT",
  /** Submitted but not yet viewed by admin. */
  Pending = "PENDING",
  /** Submitted as a quote. */
  Quote = "QUOTE",
  /** Viewed by admin but not yet shipped. */
  Processing = "PROCESSING",
  /** Shipped but not yet received. */
  Shipped = "SHIPPED",
  /** Received by customer. */
  Delivered = "DELIVERED",
  /** Cancelled by user or admin. */
  Cancelled = "CANCELLED",
}
// NOTE TODO: revise statuses to be more descriptive
// - NEW, AWAITING CONFIRMATION, CONFIRMED, IN PRODUCTION, SHIPPED, DELIVERED

export type BillingInfoWithoutIds = Omit<
  UserBillingInformation,
  "id" | "user_id"
>;
export type ShippingInfoWithoutIds = Omit<
  UserShippingInformation,
  "id" | "user_id"
>;

export type Order = {
  id: string;
  user_id: string | null;
  order_name: string;
  billing_data: BillingInfoWithoutIds;
  shipping_data: ShippingInfoWithoutIds;
  status: OrderStatus;
  date_created: Date;
  date_updated: Date;
  date_submitted?: Date | null;
  date_shipped?: Date | null;
  date_delivered?: Date | null;
};

// front-end only
export type NewOrder = Omit<Order, "id">;

export type OrderItem = {
  id: number;
  order_id: string;
  product_type_id: string; // uuid
  product_config: any; // jsonb
  quantity: number;
  note: string;
};

export type NewOrderItem = Omit<OrderItem, "id" | "order_id">;

export type Invoice = {
  id: string;
  user_id: string;
  order_id: string;
  date_created: Date;
  status: string;
  amount: number;
};
