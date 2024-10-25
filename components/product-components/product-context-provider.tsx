"use client";
import {
  NewOrder,
  NewOrderItem,
  Order,
  OrderItem,
  OrderStatus,
} from "@/lib/definitions/data-model";
import { ProductContextType } from "@/lib/definitions/product-context";
import { createContext, useContext, useState } from "react";

// {
//   order: {
//     order_name: "",
//     status: OrderStatus.Pending,
//     billing_info_id: "",
//     shipping_info: {
//       is_job_site: false,
//       delivery_addr: {
//         street: "",
//         apt_num: "",
//         city: "",
//         state: "",
//         zip: "",
//         country: "",
//       },
//       note: "",
//     },
//   },
//   setOrder: () => {},
//   orderItem: {
//     order_id: "",
//     glassType: "",
//     shape: "",
//     dimensions: "",
//     thickness: "",
//     tint: "",
//     fabrication_options: "",
//     misc_options: "",
//     note: "",
//     quantity: 0,
//   },
//   setOrderItem: () => {},
//   orderItems: [],
//   setOrderItems: () => {},
//   // productNav: {
//   //     activeSection: 'Glass Type',
//   //     setActiveSection: () => {}
//   // },
//   // setProductNav: () => {},
//   updateOrderItemQuantity: () => {},
// }

export const ProductContext = createContext<ProductContextType>(
  {} as ProductContextType
);

export default function ProductContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [productNav, setProductNav] = useState<ProductNav>({
  //     activeSection: 'Glass Type',
  //     setActiveSection: () => {}
  // });
  const [order, setOrder] = useState<NewOrder | Order>({
    user_id: null, // NOTE TODO: where should the user id be set - server or client side?
    order_name: "",
    billing_data: {
      street: "",
      apt_num: "",
      city: "",
      state: "",
      zip: "",
      payment_method: "",
      purchase_order: "",
      primary_contact_name: "",
      primary_contact_email: "",
      primary_contact_phone: "",
      fax_num: "",
      is_primary: false,
      is_active: false,
    },
    shipping_data: {
      street: "",
      apt_num: "",
      city: "",
      state: "",
      zip: "",
      is_job_site: false,
      note: "",
    },
    status: OrderStatus.Draft,
    date_created: new Date(),
    date_updated: new Date(),
    date_submitted: null,
    date_shipped: null,
    date_delivered: null,
  });

  const [orderItem, setOrderItem] = useState<OrderItem | NewOrderItem>({
    product_type_id: "",
    product_config: {},
    quantity: 1,
    note: "",
  });

  const [orderItems, setOrderItems] = useState<OrderItem[] | NewOrderItem[]>(
    []
  );

  const updateOrderItemQuantity = (quantity: number) => {
    setOrderItem((prev) => ({
      ...prev,
      quantity: quantity,
    }));
  };

  return (
    <ProductContext.Provider
      value={{
        order,
        setOrder,
        orderItem,
        setOrderItem,
        orderItems,
        setOrderItems,
        updateOrderItemQuantity,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  return useContext(ProductContext);
}
