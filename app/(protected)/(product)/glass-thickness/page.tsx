import ProductHeader from "@/components/product-components/product-header";
import { DimensionRoute, TintRoute } from "@/routes";
import GlassThicknessCard from "./glass-thickness-card";

export default function GlassThicknessPage() {
    console.log("xxxxxxxxxxxxxxxxxxxxxxxx");
    console.log("Glass Thickness Page Rendered");
    console.log("xxxxxxxxxxxxxxxxxxxxxxxx"); 

    return (
        <div className="container p-4 space-y-4">
            <ProductHeader title="Glass Thickness" backRoute={DimensionRoute.href} continueRoute={TintRoute.href}/>
            <GlassThicknessCard />
        </div>
    )
}