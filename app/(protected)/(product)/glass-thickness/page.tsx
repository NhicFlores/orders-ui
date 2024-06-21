"use client";
import { useProductContext } from "@/components/product-components/product-context-provider";
import ProductHeader from "@/components/product-components/product-header";
import ThicknessCard from "@/components/product-components/ThicknessCard";
import { DimensionRoute, TintRoute } from "@/routes";

export default function GlassThicknessPage() {
    console.log("xxxxxxxxxxxxxxxxxxxxxxxx");
    console.log("Glass Thickness Page Rendered");
    console.log("xxxxxxxxxxxxxxxxxxxxxxxx"); 
    const { setOrderItem } = useProductContext();

    const handleSelection = (thickness: string) => {
        setOrderItem((prev) => ({
            ...prev,
            thickness: thickness,
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