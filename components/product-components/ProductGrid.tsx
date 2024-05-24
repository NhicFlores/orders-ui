'use client'
import glassImage from '@/public/images/glass-verre.jpg';
import ProductCard from './product-card';
import { useState } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { DimensionRoute } from '@/app/lib/routes';

const productList = [
    {
        title: "Annealed Glass",
        description: "Standard glass type used in various applications.",
        imageSrc: glassImage,
        alt: "Annealed Glass",
        id: "12345324",
      },
      {
        title: "Tempered Glass",
        description: "Stronger and safer glass type, ideal for doors and windows.",
        imageSrc: glassImage,
        alt: "Tempered Glass",
        id: "56345",
      },
      {
        title: "Laminated Glass",
        description:
          "Glass with a plastic layer for extra security and soundproofing.",
        imageSrc: glassImage,
        alt: "Laminated Glass",
        id: "95678490",
      },
      {
        title: "Annealed Glass",
        description: "Standard glass type used in various applications.",
        imageSrc: glassImage,
        alt: "Annealed Glass",
        id: "946134669",
      },
      {
        title: "Tempered Glass",
        description: "Stronger and safer glass type, ideal for doors and windows.",
        imageSrc: glassImage,
        alt: "Tempered Glass",
        id: "97323784",
      },
];

export default function ProductGrid(){
    const [selectedCard, setSelectedCard] = useState<string | null>(null);

    const handleCardClick = (id: string) => {
        console.log('------------------------------\n---------------------------- card clicked! ------------------------------\n----------------------------')
        setSelectedCard(id);
      }

  return (
    <div className='container mx-auto p-4'>
      <div className='flex justify-between'>
        <Button variant={'outline'}>
          Back
        </Button>
        <h1 className='text-2xl font-bold mb-4'>
          Select Glass Type
        </h1>
        <Button asChild>
          <Link href={DimensionRoute.href}>
            Continue
          </Link>
        </Button>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {productList.map((item, i) => (
            <ProductCard
                key={i}
                title={item.title}
                prodId={item.id}
                description={item.description}
                imageSrc={item.imageSrc}
                alt={item.alt}
                isSelected={selectedCard === item.id}
                onClick={handleCardClick}
            />
        ))}
      </div>
    </div>
  )
}
