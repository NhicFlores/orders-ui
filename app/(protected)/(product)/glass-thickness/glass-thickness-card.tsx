"use client";
import { useProductContext } from "@/components/product-components/product-context-provider";
import ThicknessCard from "@/components/product-components/ThicknessCard";

export default function GlassThicknessCard() {
  const { setOrderItem } = useProductContext();

  const handleSelection = (thickness: string) => {
    setOrderItem((prev) => ({
      ...prev,
      thickness: thickness,
    }));
  };

  return (
    <div className="flex flex-col items-center">
      <ThicknessCard handleSelection={handleSelection} />
    </div>
  );
}
