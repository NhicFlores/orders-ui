"use client";
import ProductCard from "./product-card";
import { useState } from "react";
import Link from "next/link";
import { StaticImageData } from "next/image";



interface ProductGridProps {
  productList: {
    title: string;
    description: string;
    imageSrc: StaticImageData;
    alt: string;
    id: string;
  }[];
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
      {productList.map((item, i) => (
          <ProductCard
            key={i}
            title={item.title}
            prodId={item.id}
            description={item.description}
            imageSrc={item.imageSrc}
            alt={item.alt}
            isSelected={selectedCard === item.id}
            onClick={handleCardClick}
          />
      ))}
    </div>
  );
}
