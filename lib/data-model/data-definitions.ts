import { Order, OrderInvoice, OrderItem } from "./schema-definitions";

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
  Pick<OrderInvoice, "amount" | "order_invoice_id"> & {
    ordered_by: string; //UserProfile.first_name + UserProfile.last_name
    order_items: OrderItem[];
  };

export type InvoiceTableRow = OrderInvoice &
  Pick<Order, "order_name" | "billing_data"> & {
    customer_name: string; //UserProfile.first_name + UserProfile.last_name
  };
