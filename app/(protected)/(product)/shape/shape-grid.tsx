"use client";
import { shapeOptions } from "@/lib/data/product-placeholder-data";
import { useProductContext } from "@/components/product-components/product-context-provider";
import ProductGrid from "@/components/product-components/ProductGrid";
import { DimensionRoute } from "@/routes";

export default function ShapeGrid() {

    const { setOrderItem } = useProductContext();

    const handleSelect = (configOption: string) => {
        setOrderItem((prevOrderItem) => ({
          ...prevOrderItem,
          shape: configOption,
        }));
    
        // console.log("selected shape: ", configOption);
        // console.log("order: ", order);
        // console.log("summaryCard: ", summaryCard);
      };

      return (
        <ProductGrid productList={shapeOptions} onSelect={handleSelect}  nextConfigRoute={DimensionRoute.href}/>
      );
}