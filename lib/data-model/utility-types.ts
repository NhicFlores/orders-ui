/**
 * This file contains utility types are used in front-end functions
 */
import {
  CustomerBillingInformation,
  CustomerShippingInformation,
  Order,
  OrderItem,
} from "./schema-types";

/**
 * NewOrder is the data type made up of the required
 * fields for the New Order Form component
 */
export type NewOrder = Omit<Order, "order_id" | "order_number" | "amount">;

/**
 * ShippingFields is the data type made up of the required
 * fields for the Shipping Form component
 */
export type ShippingFields = Omit<
  CustomerShippingInformation,
  "shipping_info_id" | "customer_id"
>;
/**
 * union type of CustomerShippingInformation and ShippingFields
 */
export type ShippingData = CustomerShippingInformation | ShippingFields;

/**
 * BillingFields is the data type made up of the required
 * fields for the Billing Form component
 */
export type BillingFields = Omit<
  CustomerBillingInformation,
  "billing_info_id" | "customer_id"
>;
/**
 * union type of CustomerBillingInformation and BillingFields
 */
export type BillingData = CustomerBillingInformation | BillingFields;

/**
 * data type for the quantity_incoming field in the inventory table 
 */
export interface QuantityIncoming {
  quantity_incoming: number;
  restock_order_id: string;
  supplier_id: string;
  expected_arrival_date: Date;
}

/**
 * NewOrderItem is the data type made up of the required fields for an order item 
 * before it's saved to the database 
 */
export type NewOrderItem = Omit<OrderItem, "order_item_id" | "order_id">;

/**
 * used to initialize visibility of each status in order data table 
 */
export type StatusDetails = {
  statusValue: string;
  isVisible: boolean;
};