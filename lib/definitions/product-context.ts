// export type ProductNavSections = 'Glass Type' | 'Glass Shape' | 'Glass Size' | 'Glass Thickness' | 'Glass Color' | 'Summary';

import {
  Order,
  OrderItem,
} from "../data-model/schema-types";
import { NewOrder, NewOrderItem } from "../data-model/utility-types";

// export type ProductNav = {
//     activeSection: ProductNavSections;
//     setActiveSection: React.Dispatch<React.SetStateAction<ProductNavSections>>;
// }

export type ProductContextType = {
  order: Order | NewOrder;
  setOrder: React.Dispatch<React.SetStateAction<Order | NewOrder>>;
  orderItem: OrderItem | NewOrderItem;
  setOrderItem: React.Dispatch<React.SetStateAction<OrderItem | NewOrderItem>>;
  orderItems: OrderItem[] | NewOrderItem[];
  setOrderItems: React.Dispatch<
    React.SetStateAction<OrderItem[] | NewOrderItem[]>
  >;
  // productNav: ProductNav;
  // setProductNav: React.Dispatch<React.SetStateAction<ProductNav>>;
  updateOrderItemQuantity: (quantity: number) => void;
};
