import SummaryMenu from '@/components/product-components/summary-menu'

const ProductLayout = ({ children }: {children: React.ReactNode}) => {
  return (
    <main className='h-screen w-full flex'>
      <div className='bg-sky-100 flex flex-col justify-center'>
        <SummaryMenu/>
      </div>
      <div className='bg-gray-100 w-full'>
        {children}
      </div>
    </main>
  )
}

export default ProductLayout
