import DimensionsCard from '@/components/product-components/DimensionsCard'
import ProductHeader from '@/components/product-components/product-header'
import { ShapeRoute, TintRoute } from '@/routes'
import React from 'react'

const DimensionsPage = () => {
  return (
    <div className='container mx-auto p-4'>
      <ProductHeader title="Enter Dimensions" backRoute={ShapeRoute.href} continueRoute={TintRoute.href} />
      <div className='flex justify-center'>
        <DimensionsCard/>
      </div>
    </div>
  )
}

export default DimensionsPage
