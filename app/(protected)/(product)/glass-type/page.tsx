import CardWithButton from '@/components/product-components/card-with-button'
import ProductCard from '@/components/product-components/product-card'
import React from 'react'
import glassImage from '@/public/images/glass-verre.jpg';
import ProductGrid from '@/components/product-components/ProductGrid';

const GlassTypePage = () => {

  //pass specification string as a prop 
  // if specification string has certain values 
  // set render array = to corresponding options array 
  // all options will be displayed using general product card 
  // name - image - description 
  // in the background, summary is getting the price 
  // this could all be done on a single page with one component 
  // if the render array is being monitored by state 

  return (
    <div>
      <ProductGrid/>
    </div>
  )
}

export default GlassTypePage
