'use client';
import { glassTypes, shapeOptions } from "@/lib/data/product-placeholder-data";
import { OrderStatus } from "@/lib/definitions/definitions";
import { ProductContextType, ProductNav, SummaryCard } from "@/lib/definitions/product-context";
import { createContext, useContext, useState } from "react";

export const ProductContext = createContext<ProductContextType>({
    order: {
        id: '',
        customer_id: '',
        order_name: '',
        product_id: '',
        quantity: 0,
        price: 0,
        date: '',
        status: OrderStatus.Pending,
        glassConfig: {
            id: '',
            glass_type: glassTypes[0],
            glass_shape: shapeOptions[0],
            glass_dimensions: {},
            glass_thickness: {},
            glass_tint: {},
            glass_options: {}
        }
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
    const [order, setOrder] = useState({
        id: '',
        customer_id: '',
        order_name: '',
        product_id: '',
        quantity: 0,
        price: 0,
        date: '',
        status: OrderStatus.Pending,
        glassConfig: {
            id: '',
            glass_type: glassTypes[0],
            glass_shape: shapeOptions[0],
            glass_dimensions: {},
            glass_thickness: {},
            glass_tint: {},
            glass_options: {}
        }
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