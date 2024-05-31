"use client";
import {
  Product,
  Shape
} from "@/lib/definitions/order-item-definitions";
import {
  shapeOptions
} from "@/lib/data/product-placeholder-data";
import { useProductContext } from "@/components/product-components/product-context-provider";
import ProductHeader from "@/components/product-components/product-header";
import ProductGrid from "@/components/product-components/ProductGrid";
import { DimensionRoute, GlassTypeRoute } from "@/routes";

const ShapePage = () => {
  const { setOrder, setSummaryCard } = useProductContext();

  const handleSelect = (configOption: string) => {
    setSummaryCard((prev) => ({
      ...prev,
      orderSpec: {
        ...prev.orderSpec,
        glassShape: configOption,
      },
    }));
  };



  // const productList = shapeOptions.map((shape) => {
  //   return {
  //     id: shape.id,
  //     name: shape.name,
  //     imageSrc: shape.imageSrc,
  //     alt: shape.alt,
  //   } as Product;
  // });
  // NOTE TODO: why do i not get a type error when i pass shapeOptions to ProductGrid
  return (
    <div className="container mx-auto p-4">
      <ProductHeader
        title="Select Shape"
        backRoute={GlassTypeRoute.href}
        continueRoute={DimensionRoute.href}
      />
      <ProductGrid productList={shapeOptions} onSelect={handleSelect} />
    </div>
  );
};

export default ShapePage;
