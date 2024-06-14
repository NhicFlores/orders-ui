"use client";
import { Product, Shape } from "@/lib/definitions/order-item-definitions";
import { shapeOptions } from "@/lib/data/product-placeholder-data";
import { useProductContext } from "@/components/product-components/product-context-provider";
import ProductHeader from "@/components/product-components/product-header";
import ProductGrid from "@/components/product-components/ProductGrid";
import { DimensionRoute, GlassTypeRoute } from "@/routes";

const ShapePage = () => {
  const { order, setOrder, summaryCard, setSummaryCard } = useProductContext();

  const handleSelect = (configOption: string) => {
    setSummaryCard((prev) => ({
      ...prev,
      orderSpec: {
        ...prev.orderSpec,
        glassShape: configOption,
      },
    }));
    // Add selected shape to order
    setOrder((prev) => {
      const newShape = shapeOptions.find(
        (shape) => shape.name === configOption
      );
      if (!newShape) {
        throw new Error("Shape not found");
      }
      return {
        ...prev,
        product_config: {
          ...prev.product_config,
          glass_shape: newShape,
        },
      };
    });

    console.log("selected shape: ", configOption);
    console.log("order: ", order);
    console.log("summaryCard: ", summaryCard);
  };

  // NOTE TODO:on select, add shape to order

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
