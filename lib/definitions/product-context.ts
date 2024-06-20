import { NewOrder, OrderItem } from "./order-definitions";

export type SummaryCard = {
    orderName: string;
    orderSpec: SpecificationString;
    productQuantity: number;
}

export type SpecificationString = {
    glassType: string;
    glassShape: string;
    glassSize: string;
    glassThickness: string;
    glassColor: string;
}

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
    summaryCard: SummaryCard;
    setSummaryCard: React.Dispatch<React.SetStateAction<SummaryCard>>;
    // productNav: ProductNav;
    // setProductNav: React.Dispatch<React.SetStateAction<ProductNav>>;
    updateOrderItemQuantity: (quantity: number) => void;
}