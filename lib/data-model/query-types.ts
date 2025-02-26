import {
  Customer,
  Order,
  OrderInvoice,
  OrderItem,
} from "./schema-types";

/**
 * type for each row in Order Table 
 */
export type OrderTableRow = Order &
  Pick<OrderInvoice, "order_invoice_id"> & {
    order_items: OrderItem[];
  };

// IMPLEMENTATION NOTE: this object can be built in the front-end, maybe by using React Context,
// from data fetched from parallel queries to the order, order_invoice, and order_items tables
// instead of one large query
// type used by fetchOrderDetailsById() to get all order page data
export type AllOrderFormFields = Order & {
  // order invoice table
  order_invoice_id: string; // nullable
  // customer table
  customer_name: string;
  // user profile table
  ordered_by: string;
};

// type used by fetchOrderById() to get only order data for order page
export type OrderPageFields = Order & {
  // profile table
  ordered_by: string;
  // customer table
  customer_name: string;
};

/**
 * type for query that fetches invoice details for Order Page 
 */
export type InvoiceField = {
  // param to navigate to dynamic invoice page 
  invoice_id: string;
  // field to display on order page 
  invoice_number: string;
};

// export type ItemTableRow = OrderItem & Pick<InventoryProduct, "type">;
// export type ItemTableRow = OrderItem & InventoryProduct;
/**
 * type for each row in Item Table in Order Page 
 */
export type ItemTableRow = {
  order_item_id: number;
  order_id: string;
  product_type_id: string; // uuid
  product_config: any; // jsonb
  quantity: number;
  note: string;
  type: string;
};

/**
 * type for each row in Invoice Table 
 */
export type InvoiceTableRow = OrderInvoice &
  Pick<Order, "order_name" | "billing_data"> & {
    created_by_name: string; //UserProfile.first_name + UserProfile.last_name
    customer_name: string; 
  };

  export type NewInvoiceFormFields = {
    order_id: string;
    order_name: string;
    customer_name: string;
    order_number: string;
    amount: number;
    billing_data: any;
    // customer info 
    customer_id: string;
    account_number: string;
    // user 
    created_by: string;
    user_name: string;
    phone: string;
  };

export type CustomerTableRow = Pick<Customer, "customer_id" | "name" | "account_num" | "credit_status" | "credit_limit"> & {
  balance: number;
  unpaid_invoice_count: number;
  total_spent: number;
  order_count: number;
  latest_order_date: Date;
}