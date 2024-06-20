// definitions for data

import {
  GlassConfiguration,
  OrderStatus,
} from "@/lib/definitions/order-definitions";

// describes the shape of the data, and what data type each property should accept

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
