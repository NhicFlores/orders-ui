"use client";
import { useProductContext } from "@/components/product-components/product-context-provider";
import ThicknessCard from "@/components/product-components/ThicknessCard";

export default function GlassThicknessPage() {
    const { setSummaryCard } = useProductContext();

    const handleSelection = (thickness: string) => {
        setSummaryCard((prev) => ({
            ...prev,
            orderSpec: {
                ...prev.orderSpec,
                glassThickness: thickness,
            },
        }));
    };

    return (
        <ThicknessCard handleSelection={handleSelection}/>
    )
}