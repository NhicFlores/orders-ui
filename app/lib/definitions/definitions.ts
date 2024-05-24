// definitions for data

import {
  Dimensions,
  GlassType,
  Options,
  Shape,
  Thickness,
  Tint,
} from "./order-item-definitions";

// describes the shape of the data, and what data type each property should accept
export enum OrderStatus {
  Pending = "pending",
  Draft = "draft",
  Shipped = "shipped",
  Processing = "processing",
  Quote = "quote",
}

export type TestProduct = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  // imageSrc: string;
  // alt: string;
};

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

export type GlassConfiguration = {
  id: string;
  glass_type: GlassType;
  glass_shape: Shape;
  glass_dimensions: Dimensions;
  glass_thickness: Thickness;
  glass_tint: Tint;
  glass_options: Options;
};
//quote: nullable field or status -

export type OrderKeys = keyof Order;

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

//depracated
// export type User = {
//   id: string;
//   name: string;
//   email: string;
//   password: string;
// };

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
