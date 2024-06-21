"use client";
import { tintOptions } from "@/lib/data/product-placeholder-data";
import { useProductContext } from '@/components/product-components/product-context-provider';
import ProductHeader from '@/components/product-components/product-header';
import ProductGrid from '@/components/product-components/ProductGrid';
import { GlassThicknessRoute, OrderSummaryRoute } from '@/routes';
import { useState } from "react";

const TintPage = () => {
  // console.log("xxxxxxxxxxxxxxxxxxxxxxxx");
  // console.log("Tint Page Rendered");
  // console.log("xxxxxxxxxxxxxxxxxxxxxxxx"); 
  const { setOrderItem, setOrderItems } = useProductContext();
  const [count , setCount] = useState(0);

  const handleSelect = (tint: string) => {
    console.log("------------- Tint Selected: handleSelect called ------------");
    setOrderItem((prev) => {
      const updatedOrderItem = {...prev, tint: tint}; 
      setOrderItems((prev) => [...prev, updatedOrderItem]);
      return updatedOrderItem;
    });
    // orderItems.push(orderItem); // this is bad practice because it mutates the state
    //setOrderItems((prev) => [...prev, orderItem]);
    setCount((prevCount) => prevCount + 1);
  };

  console.log("xxxxxxxxxxxxxxxxxxxxxxxx");
  console.log("COUNT: ", count);
  console.log("xxxxxxxxxxxxxxxxxxxxxxxx");

  return (
    <div className='p-4'>
      <ProductHeader title="Select Tint" backRoute={GlassThicknessRoute.href} continueRoute={OrderSummaryRoute.href}/>
      <ProductGrid productList={tintOptions} onSelect={handleSelect} nextConfigRoute={OrderSummaryRoute.href}/>
    </div>
  )
}

export default TintPage
