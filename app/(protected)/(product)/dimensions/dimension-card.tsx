"use client";
import DimensionsCard from "@/components/product-components/DimensionsCard";
import { useProductContext } from "@/components/product-components/product-context-provider";
import { shapeOptions } from "@/lib/data/product-placeholder-data";
import { useCallback } from "react";

export default function DimensionCard() {
  const { orderItem, setOrderItem } = useProductContext();
  const handleSelection = useCallback(
    (dimensionString: string) => {
      setOrderItem((prev) => ({
        ...prev,
        dimensions: dimensionString,
      }));
    },
    [setOrderItem]
  );

  //get selected shape from order
  const glass_shape = shapeOptions.find(
    (shape) => orderItem.product_config.shape ? shape.name === orderItem.product_config.shape : false
  );

  return (
    <div className="flex justify-center">
      <DimensionsCard shape={glass_shape} handleSelection={handleSelection} />
    </div>
  );
}
