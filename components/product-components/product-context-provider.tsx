'use client';
import { ProductContextType, ProductNav, SummaryCard } from "@/lib/definitions/product-context";
import { createContext, useContext, useState } from "react";

export const ProductContext = createContext<ProductContextType>({
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
    return (
        <ProductContext.Provider value={{ summaryCard, setSummaryCard, productNav, setProductNav }}>
            {children}
        </ProductContext.Provider>
    );
}

export function useProductContext() {
    return useContext(ProductContext);
}