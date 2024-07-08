import ProductHeader from '@/components/product-components/product-header'
import { ShapeRoute, GlassThicknessRoute } from '@/routes'
import DimensionCard from './dimension-card';

const DimensionsPage = () => {
  console.log("xxxxxxxxxxxxxxxxxxxxxxxx");
  console.log("Dimensions Page Rendered");
  console.log("xxxxxxxxxxxxxxxxxxxxxxxx"); 

  return (
    <div className='container p-4 space-y-4'>
      <ProductHeader title="Enter Dimensions" backRoute={ShapeRoute.href} continueRoute={GlassThicknessRoute.href} />
      <DimensionCard />
    </div>
  )
}

export default DimensionsPage
