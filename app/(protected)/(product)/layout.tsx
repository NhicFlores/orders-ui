'use client';
import React from 'react';
import SummaryCard from '@/components/product-components/summary-card'
import { useState } from 'react'

type ChildComponentProps = {
  updateSelections?: (selection: string) => void;
  [key: string]: any;
};

const ProductLayout = ({ children }: {children: React.ReactNode}) => {
  //set state for managing running total 
  //className='bg-gray-100 basis-4/6'
  //call back for selection ids 
  //pass ids to calculator 
  const [selections, setSelections] = useState<string[]>([])

  function updateSelections(selection: string) {
    setSelections([...selections, selection])
  }

  const childrenWithProps = React.Children.map(children, child =>
    React.isValidElement<ChildComponentProps>(child) ? React.cloneElement(child, { updateSelections }) : child
  );

  return (
    <main className='h-screen flex'>
      <div className='basis-1/6 border-r-2 px-2'>
        <div className='border rounded-md p-4 text-center'>
          product nav goes here 
        </div>
      </div>
      <div className='bg-slate-100 basis-4/6 flex justify-center'>
        {children}
      </div>
      <div className='flex flex-col basis-1/6 justify-center border-l-2 px-2'>
        <SummaryCard selections={selections}/>
      </div>
    </main>
  )
}

export default ProductLayout
