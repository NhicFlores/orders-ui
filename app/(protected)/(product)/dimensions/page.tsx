"use client";
import DimensionsCard from '@/components/product-components/DimensionsCard'
import { useProductContext } from '@/components/product-components/product-context-provider'
import ProductHeader from '@/components/product-components/product-header'
import { ShapeRoute, TintRoute } from '@/routes'

const DimensionsPage = () => {

  const { order, setSummaryCard } = useProductContext();
  const handleSelection = (dimensionString: string) => {
    setSummaryCard((prev) => ({
      ...prev,
      orderSpec: {
        ...prev.orderSpec,
        glassSize: dimensionString,
      }
    }))
  }
  //get selected shape from order
  const { glass_shape } = order.glassConfig;

  return (
    <div className='container mx-auto p-4'>
      <ProductHeader title="Enter Dimensions" backRoute={ShapeRoute.href} continueRoute={TintRoute.href} />
      <div className='flex justify-center'>
        <DimensionsCard shape={glass_shape} handleSelection={handleSelection}/>
      </div>
    </div>
  )
}

export default DimensionsPage
