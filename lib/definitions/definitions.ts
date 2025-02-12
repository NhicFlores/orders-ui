// definitions for data

import { GlassConfiguration } from "@/lib/definitions/product-types";
import { OrderStatus } from "../data-model/enum-types";

// describes the shape of the data, and what data type each property should accept

export type Order_DEPRECATED = {
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

export type OrderKeys = keyof Order_DEPRECATED; 

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
// unused 
export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};
// unused
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
// unused
export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};
// unused
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
// unused 
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
