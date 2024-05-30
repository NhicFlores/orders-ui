"use client";
import glassImage from "@/public/images/glass-verre.jpg";
import ProductCard from "./product-card";
import { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ShapeRoute } from "@/routes";
import { useProductContext } from "./product-context-provider";
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

  const { setSummaryCard } = useProductContext();

  const handleCardClick = (id: string, configOption: string) => {
    console.log(
      "------------------------------\n---------------------------- card clicked! ------------------------------\n----------------------------"
    );
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
