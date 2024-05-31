"use client";
import ProductCard from "./product-card";
import { useState } from "react";
import Link from "next/link";
import { Product } from "@/lib/definitions/order-item-definitions";

interface ProductGridProps {
  productList: Product[];
  onSelect: (configOption: string) => void;
}

export default function ProductGrid({ productList, onSelect }: ProductGridProps) {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleCardClick = (id: string, configOption: string) => {
    setSelectedCard(id);
    onSelect(configOption);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {productList.map((product, i) => (
          <ProductCard
            key={i}
            product={product}
            isSelected={selectedCard === product.id}
            onClick={handleCardClick}
          />
      ))}
    </div>
  );
}
