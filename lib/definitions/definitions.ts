// definitions for data

import {
  Dimension,
  FabricationOptions,
  GlassType,
  MiscOptions,
  Shape,
  Thickness,
  Tint,
} from "@/lib/definitions/order-item-definitions";
import { BillingInfo, ShippingInfo } from "./profile-definitions";

// describes the shape of the data, and what data type each property should accept
export enum OrderStatus {
  Pending = "pending",
  Draft = "draft",
  Shipped = "shipped",
  Processing = "processing",
  Quote = "quote",
}

export type Order = {
  id: string;
  customer_id: string;
  order_name: string;
  product_id: string;
  quantity: number;
  price: number;
  date: string;
  status: OrderStatus;
  glassConfig: GlassConfiguration;
};

export type OrderKeys = keyof Order;

// NOTE: TODO: each order will have: 
//   - unique id 
//   - product list 
//     - quantity per product 
// for transferring to old system we need to split the order
//   - order_id + product_id + i/quantity
//   - 8634562 - 2345 - 1 / 10 
export type NewOrder = {
  user_id: string;
  order_name: string;
  order_items: GlassConfiguration[];
  product_config: GlassConfiguration;
  billing_info_id: string;
  shipping_info_id: string;
  status: OrderStatus;
}

export type GlassConfiguration = {
  glass_type: GlassType;
  glass_shape: Shape;
  glass_dimensions: Dimension[];
  glass_thickness: Thickness;
  glass_tint: Tint;
  fabrication_options?: FabricationOptions;
  glass_options: MiscOptions;
  quantity?: number;
};
//NOTE TEST TYPES
export type TestOrder = {
  order_name: string;
  order_items: TestConfig[];
  status: string;
}

export type TestConfig = {
  glass_type: string;
  glass_shape: string;
  glass_dimensions: string;
  glass_thickness: string;
  glass_tint: string;
  fabrication_options: string;
  glass_options: string;
  quantity?: number;
};

//this object is used to verify the data requested from db on edit forms
export type OrderForm = {
  id: string;
  customer_id: string;
  order_name: string;
  product_id: string;
  quantity: number;
  price: number;
  status: OrderStatus;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: "pending" | "paid";
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

export type LatestInvoiceRaw = Omit<LatestInvoice, "amount"> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: "pending" | "paid";
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: "pending" | "paid";
};
