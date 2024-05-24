import ProductHeader from "@/components/product-components/product-header";
import ProductGrid from "@/components/product-components/ProductGrid";
import { DimensionRoute, GlassTypeRoute } from "@/routes";

const ShapePage = () => {
  return (
    <div className='container mx-auto p-4'>
      <ProductHeader title="Select Shape" backRoute={GlassTypeRoute.href} continueRoute={DimensionRoute.href} />
      <ProductGrid />
    </div>
  );
};

export default ShapePage;
