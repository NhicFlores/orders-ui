import SummaryMenu from '@/components/product-components/summary-menu'

const ProductLayout = ({ children }: {children: React.ReactNode}) => {
  return (
    <main className='h-screen flex'>
      <div className='bg-sky-100 flex flex-col justify-center basis-1/4'>
        <SummaryMenu/>
      </div>
      <div className='bg-gray-100 basis-3/4'>
        {children}
      </div>
    </main>
  )
}

export default ProductLayout
