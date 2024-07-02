"use client";
import { shapeOptions } from "@/lib/data/product-placeholder-data";
import { useProductContext } from "@/components/product-components/product-context-provider";
import ProductHeader from "@/components/product-components/product-header";
import ProductGrid from "@/components/product-components/ProductGrid";
import { DimensionRoute, GlassTypeRoute } from "@/routes";

const ShapePage = () => {
  console.log("xxxxxxxxxxxxxxxxxxxxxxxx");
  console.log("Shape Page Rendered");
  console.log("xxxxxxxxxxxxxxxxxxxxxxxx"); 
  const { setOrderItem } = useProductContext();

  const handleSelect = (configOption: string) => {
    setOrderItem((prev) => ({
      ...prev,
      shape: configOption,
    }));

    // console.log("selected shape: ", configOption);
    // console.log("order: ", order);
    // console.log("summaryCard: ", summaryCard);
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
  // Because shapeOptions is an array of objects that have the same shape as Product 
  // so it is implicitly cast to Product[] because they share the same properties 
  // so I refactored the Shape type to extend Product type
  return (
    <div className="container p-4 space-y-4">
      <ProductHeader
        title="Select Shape"
        backRoute={GlassTypeRoute.href}
        continueRoute={DimensionRoute.href}
      />
      <ProductGrid productList={shapeOptions} onSelect={handleSelect}  nextConfigRoute={DimensionRoute.href}/>
    </div>
  );
};

export default ShapePage;
