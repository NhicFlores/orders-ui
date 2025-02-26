/**
 * UserRoleOptions is an object with keys and values that represent all possible UserRole values
 */
export const UserRoleOptions = {
  Admin: "ADMIN",
  User: "USER",
} as const;
/**
 * UserRole type is a union of all possible UserRole values used as the type for the role field in User objects
 */
export type UserRole = (typeof UserRoleOptions)[keyof typeof UserRoleOptions];
/**
 * UserRoleArray is an array of all possible UserRole values used to iterate over role values
 */
export const UserRoleArray = Object.values(UserRoleOptions);
/**
 * type guard for role value; returns true if role is a valid UserRole value
 * @param role
 * @returns
 */
export function isValidUserRole(role: any): role is UserRole {
  return UserRoleArray.includes(role);
}

// TODO NOTE: revise statuses to be more descriptive
// - NEW, AWAITING CONFIRMATION, CONFIRMED, IN PRODUCTION, SHIPPED, DELIVERED
/**
 * OrderStatusOptions is an object with keys and values that represent all possible OrderStatus values
 */
export const OrderStatusOptions = {
  /** Saved by the user but not yet submitted. */
  Draft: "DRAFT",
  /** Submitted but not yet viewed by admin. */
  Pending: "PENDING",
  /** Submitted for a quote. */
  Quote: "QUOTE",
  /** Viewed by admin but not yet approved */
  Processing: "PROCESSING",
  /** Shipped but not yet received. */
  Shipped: "SHIPPED",
  /** Received by customer. */
  Delivered: "DELIVERED",
  /** Cancelled by user or admin. */
  Cancelled: "CANCELLED",
} as const;
// update status values: 
// 'QUOTE REQUESTED', 'QUOTE SENT', 'QUOTE REVISED', 'QUOTE ACCEPTED', 'QUOTE REJECTED', 
// 'ORDER CONFIRMED', 'ORDER IN PRODUCTION', 'ORDER SHIPPED', 'ORDER DELIVERED', 
// 'ORDER CANCELLED', 'ORDER REFUNDED', 'ORDER RETURNED' 
/**
 * OrderStatus type is a union of all possible OrderStatus values used as the type for the status field in Order objects
 */
export type OrderStatus =
  (typeof OrderStatusOptions)[keyof typeof OrderStatusOptions];
/**
 * OrderStatusArray is an array of all possible OrderStatus values used to iterate over status values
 */
export const OrderStatusArray = Object.values(OrderStatusOptions);
/**
 * type guard for status value; returns true if status is a valid OrderStatus value
 * @param status
 * @returns
 */
export function isValidOrderStatus(status: any): status is OrderStatus {
  return OrderStatusArray.includes(status);
}

/**
 * InvoiceStatusOptions is an object with keys and values that represent all possible InvoiceStatus values
 */
export const InvoiceStatusOptions = {
  /** Invoice has been created but not yet paid. */
  Unpaid: "UNPAID",
  /**  */
  Pending: "PENDING",
  /** Invoice has been paid. */
  Paid: "PAID",
  /** Invoice has been refunded. */
  Refunded: "REFUNDED",
  /** Invoice has been cancelled. */
  Cancelled: "CANCELLED",
} as const;

/**
 * InvoiceStatus type is a union of all possible InvoiceStatus values used as the type for the status field in Invoice objects
 */
export type InvoiceStatus =
  (typeof InvoiceStatusOptions)[keyof typeof InvoiceStatusOptions];

/**
 * InvoiceStatusArray is an array of all possible InvoiceStatus values used to iterate over status values
 */
export const InvoiceStatusArray = Object.values(InvoiceStatusOptions);

/**
 * type guard for invoice status values; returns true if status is a valid InvoiceStatus value
 * @param status
 * @returns
 */
export function isValidInvoiceStatus(status: any): status is InvoiceStatus {
  return InvoiceStatusArray.includes(status);
}

// NOTE: could turn this into payment info object
// in schema, this would be a column in billing info table
// with jsonb type
// export type PaymentMethod = {
//   type: string;
// };
// used when generating billing info for orders
export const payment_method_codes = [
  "CREDIT",
  "DEBIT",
  "PURCHASE ORDER",
  "CASH",
  "CHECK",
];