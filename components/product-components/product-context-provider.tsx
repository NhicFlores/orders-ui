"use client";
import {
  Order,
  OrderItem,
} from "@/lib/data-model/schema-types";
import { ProductContextType } from "@/lib/definitions/product-context";
import { createContext, useContext, useState } from "react";
import { getDefaultOrderItemValues, getDefaultOrderValues } from "@/lib/data-model/default-constructors";
import { NewOrder, NewOrderItem } from "@/lib/data-model/utility-types";

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
  const [order, setOrder] = useState<NewOrder | Order>(getDefaultOrderValues());

  const [orderItem, setOrderItem] = useState<OrderItem | NewOrderItem>(getDefaultOrderItemValues());

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
