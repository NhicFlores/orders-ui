import ProductHeader from "@/components/product-components/product-header";
import { DimensionRoute, GlassTypeRoute } from "@/routes";
import ShapeGrid from "./shape-grid";

const ShapePage = () => {
  console.log("xxxxxxxxxxxxxxxxxxxxxxxx");
  console.log("Shape Page Rendered");
  console.log("xxxxxxxxxxxxxxxxxxxxxxxx");
  // const productList = shapeOptions.map((shape) => {
  //   return {
  //     id: shape.id,
  //     name: shape.name,
  //     imageSrc: shape.imageSrc,
  //     alt: shape.alt,
  //   } as Product;
  // });
  // RESEARCH NOTE: why do i not get a type error when i pass shapeOptions to ProductGrid
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
      <ShapeGrid />
    </div>
  );
};

export default ShapePage;
