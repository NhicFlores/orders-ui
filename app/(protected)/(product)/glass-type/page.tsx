'use client';
import React from 'react'
import glassImage from '@/public/images/glass-verre.jpg';
import ProductGrid from '@/components/product-components/ProductGrid';
import ProductHeader from '@/components/product-components/product-header';
import { ShapeRoute } from '@/routes';
import ProductFooter from '@/components/product-components/product-footer';
import { useProductContext } from '@/components/product-components/product-context-provider';
import { Product } from '@/lib/definitions/order-item-definitions';
import { glassTypes } from '@/lib/data/product-placeholder-data';

// NOTE: if i make it an object, i can update different fields of the object 

const GlassTypePage = () => {

  //pass specification string as a prop 
  // if specification string has certain values 
  // set render array = to corresponding options array 
  // all options will be displayed using general product card 
  // name - image - description 
  // in the background, summary is getting the price 
  // this could all be done on a single page with one component 
  // if the render array is being monitored by state 

  const productList = glassTypes.map((glassType) => {
    return {
      id: glassType.id,
      name: glassType.name,
      description: glassType.description,
      imageSrc: glassType.imageSrc,
      alt: glassType.alt,
    } as Product;
  });

  const { setSummaryCard } = useProductContext();
  const handleSelection = (configOption: string) => {
    setSummaryCard((prev) => ({
      ...prev,
      orderSpec: {
        ...prev.orderSpec,
        glassType: configOption,
      },
    }));
  }

  return (
    <div className='container mx-auto p-4'>
      <ProductHeader title="Glass Type" continueRoute={ShapeRoute.href}/>
      <ProductGrid productList={productList} onSelect={handleSelection}/>
      <ProductFooter/>
    </div>
  )
}

export default GlassTypePage
