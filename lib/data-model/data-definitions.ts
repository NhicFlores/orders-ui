import {
  OrderBillingInfo,
  Order,
  OrderInvoice,
  OrderItem,
  OrderShippingInfo,
} from "./schema-definitions";

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
// TODO NOTE: revise statuses to be more descriptive
// - NEW, AWAITING CONFIRMATION, CONFIRMED, IN PRODUCTION, SHIPPED, DELIVERED

export enum InvoiceStatus {
  /** Invoice has been created but not yet paid. */
  Unpaid = "UNPAID",
  /** Invoice has been paid. */
  Paid = "PAID",
  /** Invoice has been refunded. */
  Refunded = "REFUNDED",
  /** Invoice has been cancelled. */
  Cancelled = "CANCELLED",
}

export type StatusDetails = {
  statusValue: string;
  isVisible: boolean;
};

export type OrderDetails = Order &
  Pick<OrderInvoice, "order_invoice_id"> & {
    order_items: OrderItem[];
  };

// IMPLEMENTATION NOTE: this object can be built in the front-end, maybe by using React Context,
// from data fetched from parallel queries to the order, order_invoice, and order_items tables
// instead of one large query
export type OrderFormFields = {
  // order table
  order_id: string;
  created_by: string;
  customer_id: string;
  order_name: string;
  order_number: string;
  shipping_data: OrderShippingInfo;
  billing_data: OrderBillingInfo;
  status: OrderStatus;
  amount: number;
  date_created: Date;
  date_updated: Date;
  date_submitted: Date;
  date_shipped: Date;
  date_delivered: Date;
  // order invoice table
  order_invoice_id: string; // nullable
  // order items table
  order_items: OrderItem[];
};

export type InvoiceTableRow = OrderInvoice &
  Pick<Order, "order_name" | "billing_data"> & {
    customer_name: string; //UserProfile.first_name + UserProfile.last_name
  };
