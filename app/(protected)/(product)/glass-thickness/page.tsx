"use client";
import { useProductContext } from "@/components/product-components/product-context-provider";
import ProductHeader from "@/components/product-components/product-header";
import ThicknessCard from "@/components/product-components/ThicknessCard";
import { DimensionRoute, TintRoute } from "@/routes";

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
        <div className="flex flex-col w-full">
            <ProductHeader title="Glass Thickness" backRoute={DimensionRoute.href} continueRoute={TintRoute.href}/>
            <div className="flex flex-col items-center">
                <ThicknessCard handleSelection={handleSelection}/>
            </div>
        </div>
    )
}