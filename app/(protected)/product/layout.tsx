import SummaryCard from '@/components/product-components/summary-card'

const ProductLayout = ({ children }: {children: React.ReactNode}) => {
  //set state for managing running total 
  //className='bg-gray-100 basis-4/6'
  return (
    <main className='h-screen flex'>
      <div className='basis-1/6'>
        product nav goes here 
      </div>
      <div >
        {children}
      </div>
      <div className='bg-sky-100 flex flex-col basis-1/6 justify-center'>
        <SummaryCard/>
      </div>
    </main>
  )
}

export default ProductLayout
