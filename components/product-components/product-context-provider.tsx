'use client';
import { glassTypes, shapeOptions } from "@/lib/data/product-placeholder-data";
import { NewOrder, OrderStatus } from "@/lib/definitions/definitions";
import { ProductContextType, ProductNav, SummaryCard } from "@/lib/definitions/product-context";
import { createContext, useContext, useState } from "react";

export const ProductContext = createContext<ProductContextType>({
    order: {
        user_id: '',
        order_name: '',
        order_items: [],
        product_config: { //consider storing this in a separate table, so the order object is just a bunch of id's 
            glass_type: glassTypes[0],
            glass_shape: shapeOptions[0],
            glass_dimensions: [],
            glass_thickness: {},
            glass_tint: {},
            glass_options: {}
        },
        status: OrderStatus.Pending,
        billing_info_id: '',
        shipping_info_id: '',
    },
    setOrder: () => {},
    summaryCard: {
        orderName: '',
        orderSpec: {
            glassType: '',
            glassShape: '',
            glassSize: '',
            glassThickness: '',
            glassColor: ''
        },
        productQuantity: 0
    },
    setSummaryCard: () => {},
    productNav: {
        activeSection: 'Glass Type',
        setActiveSection: () => {}
    },
    setProductNav: () => {}
});

export default function ProductContextProvider({ children }: { children: React.ReactNode}) {
    const [summaryCard, setSummaryCard] = useState<SummaryCard>({
        orderName: '',
        orderSpec: {
            glassType: '',
            glassShape: '',
            glassSize: '',
            glassThickness: '',
            glassColor: ''
        },
        productQuantity: 0
    });
    const [productNav, setProductNav] = useState<ProductNav>({
        activeSection: 'Glass Type',
        setActiveSection: () => {}
    });
    const [order, setOrder] = useState<NewOrder>({
        user_id: '',
        order_name: '',
        order_items: [],
        product_config: {
            glass_type: glassTypes[0],
            glass_shape: shapeOptions[0],
            glass_dimensions: [],
            glass_thickness: {},
            glass_tint: {},
            glass_options: {}
        },
        status: OrderStatus.Draft,
        billing_info_id: '',
        shipping_info_id: '',
    });
    return (
        <ProductContext.Provider value={{ order, setOrder, summaryCard, setSummaryCard, productNav, setProductNav }}>
            {children}
        </ProductContext.Provider>
    );
}

export function useProductContext() {
    return useContext(ProductContext);
}