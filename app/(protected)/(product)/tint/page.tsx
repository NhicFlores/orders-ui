"use client";
import { Product } from "@/lib/definitions/order-item-definitions";
import { tintOptions } from "@/lib/data/product-placeholder-data";
import { useProductContext } from '@/components/product-components/product-context-provider';
import ProductHeader from '@/components/product-components/product-header';
import ProductGrid from '@/components/product-components/ProductGrid';
import { DimensionRoute } from '@/routes';

const TintPage = () => {
  const { setSummaryCard } = useProductContext();

  const handleSelect = (configOption: string) => {
    setSummaryCard((prev) => ({
      ...prev,
      orderSpec: {
        ...prev.orderSpec,
        glassColor: configOption,
      },
    }));
  };

  const productList = tintOptions.map((tint) => {
    return {
      id: tint.id,
      name: tint.name,
      imageSrc: tint.imageSrc,
      alt: tint.alt,
    } as Product;
  })

  return (
    <div className='p-4'>
      <ProductHeader title="Select Tint" backRoute={DimensionRoute.href} continueRoute=''/>
      <ProductGrid productList={productList} onSelect={handleSelect}/>
    </div>
  )
}

export default TintPage
