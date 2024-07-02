"use client";
import DimensionsCard from '@/components/product-components/DimensionsCard'
import { useProductContext } from '@/components/product-components/product-context-provider'
import ProductHeader from '@/components/product-components/product-header'
import { shapeOptions } from '@/lib/data/product-placeholder-data';
import { ShapeRoute, GlassThicknessRoute } from '@/routes'
import { useCallback } from 'react';

const DimensionsPage = () => {
  console.log("xxxxxxxxxxxxxxxxxxxxxxxx");
  console.log("Dimensions Page Rendered");
  console.log("xxxxxxxxxxxxxxxxxxxxxxxx"); 
  const { orderItem, setOrderItem } = useProductContext();
  const handleSelection = useCallback((dimensionString: string) => {
    setOrderItem((prev) => ({
      ...prev,
      dimensions: dimensionString
    }))
  }, [ setOrderItem ]);

  //get selected shape from order
  const glass_shape = shapeOptions.find(shape => shape.name === orderItem.shape);

  return (
    <div className='container p-4 space-y-4'>
      <ProductHeader title="Enter Dimensions" backRoute={ShapeRoute.href} continueRoute={GlassThicknessRoute.href} />
      <div className='flex justify-center'>
        <DimensionsCard 
        shape={glass_shape}
        handleSelection={handleSelection}/>
      </div>
    </div>
  )
}

export default DimensionsPage
