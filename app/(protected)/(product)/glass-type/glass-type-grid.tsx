"use client";
import React from "react";
import ProductGrid from "@/components/product-components/ProductGrid";
import { ShapeRoute } from "@/routes";
import { useProductContext } from "@/components/product-components/product-context-provider";
import { glassTypes } from "@/lib/data/product-placeholder-data";

export default function GlassTypeGrid() {
  const { setOrderItem } = useProductContext();

  const handleSelect = (configOption: string) => {
    setOrderItem((prevOrderItem) => ({
      ...prevOrderItem,
      glassType: configOption,
    }));
  };

  return (
    <div>
      <ProductGrid
        productList={glassTypes}
        onSelect={handleSelect}
        nextConfigRoute={ShapeRoute.href}
      />
    </div>
  );
}
