'use client';
import { NewOrder, OrderItem, OrderStatus } from "@/lib/definitions/order-definitions";
import { ProductContextType, SummaryCard } from "@/lib/definitions/product-context";
import { createContext, useContext, useState } from "react";

export const ProductContext = createContext<ProductContextType>({
    order: {
        user_id: '',
        order_name: '',
        status: OrderStatus.Pending,
        billing_info_id: '',
        shipping_info: {
            is_job_site: false,
            isSameAsBilling: false,
            delivery_addr: {
                street: '',
                apt_num: '',
                city: '',
                state: '',
                zip: '',
                country: '',
            },
            note: '',
        },
    },
    setOrder: () => {},
    orderItem: {
        order_id: '',
        type: '',
        shape: '',
        dimensions: '',
        thickness: '',
        tint: '',
        fabrication_options: '',
        misc_options: '',
        note: '',
        quantity: 0
    },
    setOrderItem: () => {},
    orderItems: [],
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
    // productNav: {
    //     activeSection: 'Glass Type',
    //     setActiveSection: () => {}
    // },
    // setProductNav: () => {},
    updateOrderItemQuantity: () => {}
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
        productQuantity: 1
    });
    // const [productNav, setProductNav] = useState<ProductNav>({
    //     activeSection: 'Glass Type',
    //     setActiveSection: () => {}
    // });
    const [order, setOrder] = useState<NewOrder>({
        user_id: '',
        order_name: '',
        status: OrderStatus.Draft,
        billing_info_id: '',
        shipping_info: {
            is_job_site: false,
            isSameAsBilling: false,
            delivery_addr: {
                street: '',
                apt_num: '',
                city: '',
                state: '',
                zip: '',
                country: '',
            },
            note: '',
        },
    });

    const [orderItem, setOrderItem] = useState<OrderItem>({
        order_id: '',
        type: '',
        shape: '',
        dimensions: '',
        thickness: '',
        tint: '',
        fabrication_options: '',
        misc_options: '',
        note: '',
        quantity: 0
    });

    const orderItems: OrderItem[] = [];

    // const updateProductConfig = (key: string, value: any) => {
    //     setOrder((prev) => ({
    //         ...prev,
    //         product_config: {
    //             ...prev.product_config,
    //             [key]: value
    //         }
    //     }));
    // }

    const updateOrderItemQuantity = (quantity: number) => {
        setSummaryCard(prevSummary => ({
            ...prevSummary,
            productQuantity: quantity
        }))
    }

    return (
        <ProductContext.Provider value={{ order, setOrder, summaryCard, orderItem, setOrderItem, orderItems, setSummaryCard, updateOrderItemQuantity }}>
            {children}
        </ProductContext.Provider>
    );
}

export function useProductContext() {
    return useContext(ProductContext);
}