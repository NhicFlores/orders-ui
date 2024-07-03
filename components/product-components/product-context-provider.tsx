"use client";
import {
  Order,
  OrderItem,
  OrderStatus,
} from "@/lib/definitions/order-definitions";
import { ProductContextType } from "@/lib/definitions/product-context";
import { createContext, useContext, useState } from "react";

export const ProductContext = createContext<ProductContextType>({
  order: {
    user_id: "",
    order_name: "",
    status: OrderStatus.Pending,
    billing_info_id: "",
    shipping_info: {
      is_job_site: false,
      isSameAsBilling: false,
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
  },
  setOrder: () => {},
  orderItem: {
    order_id: "",
    type: "",
    shape: "",
    dimensions: "",
    thickness: "",
    tint: "",
    fabrication_options: "",
    misc_options: "",
    note: "",
    quantity: 0,
  },
  setOrderItem: () => {},
  orderItems: [],
  setOrderItems: () => {},
  // productNav: {
  //     activeSection: 'Glass Type',
  //     setActiveSection: () => {}
  // },
  // setProductNav: () => {},
  updateOrderItemQuantity: () => {},
});

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
    user_id: "",
    order_name: "untitled order",
    status: OrderStatus.Draft,
    billing_info_id: "",
    shipping_info: {
      is_job_site: false,
      isSameAsBilling: false,
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
    type: "",
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
