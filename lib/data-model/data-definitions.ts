import {
    Order,
    OrderInvoice,
    OrderItem,
    OrderStatus,
    UserProfile,
  } from "./schema-definitions";
  
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
    Pick<Order, "order_name" | "billing_data"> & 
  {
    customer_name: string; //UserProfile.first_name + UserProfile.last_name
  }
  