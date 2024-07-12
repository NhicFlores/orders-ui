"use client";
import {
  Order,
  OrderItem,
  OrderStatus,
} from "@/lib/definitions/order-definitions";
import { ProductContextType } from "@/lib/definitions/product-context";
import { BillingInfo } from "@/lib/definitions/profile-definitions";
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

export const ProductContext = createContext<ProductContextType>({} as ProductContextType);

export default function ProductContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [productNav, setProductNav] = useState<ProductNav>({
  //     activeSection: 'Glass Type',
  //     setActiveSection: () => {}
  // });
  const [order, setOrder] = useState<Order>({
    order_name: "",
    status: OrderStatus.Draft,
    billing_info_id: {
      billing_addr: {
        street: "",
        apt_num: "",
        city: "",
        state: "",
        zip: "",
        country: "",
      },
      payment_method: "",
      purchase_order: "",
      primary_contact_name: "",
      primary_contact_email: "",
      phone_num: "",
      alt_phone_num: "",
      fax_num: "",
      isPrimary: false,
      isActive: false,
    },
    shipping_info: {
      is_job_site: false,
      delivery_addr: {
        street: "",
        apt_num: "",
        city: "",
        state: "",
        zip: "",
        country: "",
      },
      note: "",
    },
  });

  const [orderItem, setOrderItem] = useState<OrderItem>({
    order_id: "",
    glassType: "",
    shape: "",
    dimensions: "",
    thickness: "",
    tint: "",
    fabrication_options: "",
    misc_options: "",
    note: "",
    quantity: 1,
  });

  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

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
