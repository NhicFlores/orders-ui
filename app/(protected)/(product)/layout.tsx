"use client";
import React from "react";
import SummaryCard from "@/components/product-components/summary-card";
import ProductContextProvider from "@/components/product-components/product-context-provider";


const ProductLayout = ({ children }: { children: React.ReactNode }) => {
  //set state for managing running total
  //className='bg-gray-100 basis-4/6'
  //call back for selection ids
  //pass ids to calculator
  const showProductNav = true;
  return (
    <ProductContextProvider>
      <main className="flex min-h-screen">
        {showProductNav && 
        <div className="px-2">
          <div className="border 
                          rounded-md 
                          p-4 
                          text-center"
                          >
            product nav goes here
          </div>
        </div>}
        <div className="bg-slate-100 
                          border 
                          flex-1
                          flex
                          flex-col
                          items-center 
                          justify-center"
                          >
          {children}
        </div>
        <div className="flex 
                        flex-col 
                        max-h-screen 
                        justify-center 
                        px-2"
                        >
          <SummaryCard/>
        </div>
      </main>
    </ProductContextProvider>
  );
};

export default ProductLayout;
