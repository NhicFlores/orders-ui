import { NewOrder, OrderItem } from "./order-definitions";



// export type ProductNavSections = 'Glass Type' | 'Glass Shape' | 'Glass Size' | 'Glass Thickness' | 'Glass Color' | 'Summary';

// export type ProductNav = {
//     activeSection: ProductNavSections;
//     setActiveSection: React.Dispatch<React.SetStateAction<ProductNavSections>>;
// }


export type ProductContextType = {
    order: NewOrder;
    setOrder: React.Dispatch<React.SetStateAction<NewOrder>>;
    orderItem: OrderItem;
    setOrderItem: React.Dispatch<React.SetStateAction<OrderItem>>;
    orderItems: OrderItem[];
    setOrderItems: React.Dispatch<React.SetStateAction<OrderItem[]>>;
    // productNav: ProductNav;
    // setProductNav: React.Dispatch<React.SetStateAction<ProductNav>>;
    updateOrderItemQuantity: (quantity: number) => void;
}