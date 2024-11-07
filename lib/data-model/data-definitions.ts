import {
    Order,
    OrderInvoice,
    OrderItem,
    OrderStatus,
    UserProfile,
  } from "./schema-definitions";
  
  export type OrderDetails = Order &
    Pick<OrderInvoice, "amount" | "order_invoice_id"> & {
      ordered_by: string; //UserProfile.first_name + UserProfile.last_name
      // order_items: OrderItem[];
    };
  
  export type OrderDetailsWithItems = {
    order_details: OrderDetails;
    order_items: OrderItem[];
  };
  