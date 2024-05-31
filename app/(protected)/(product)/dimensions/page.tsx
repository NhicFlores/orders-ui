"use client";
import DimensionsCard from '@/components/product-components/DimensionsCard'
import { useProductContext } from '@/components/product-components/product-context-provider'
import ProductHeader from '@/components/product-components/product-header'
import { ShapeRoute, TintRoute } from '@/routes'

const DimensionsPage = () => {

  const { setSummaryCard } = useProductContext();
  const handleSelection = (dimensionString: string, thickness: string) => {
    setSummaryCard((prev) => ({
      ...prev,
      orderSpec: {
        ...prev.orderSpec,
        glassSize: dimensionString,
        glassThickness: thickness,
      }
    }))
  }

  return (
    <div className='container mx-auto p-4'>
      <ProductHeader title="Enter Dimensions" backRoute={ShapeRoute.href} continueRoute={TintRoute.href} />
      <div className='flex justify-center'>
        <DimensionsCard handleSelection={handleSelection}/>
      </div>
    </div>
  )
}

export default DimensionsPage
