
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from '../ui/card'
import Image, { StaticImageData } from 'next/image';

interface ProductCardProps {
    title: string;
    prodId: string;
    description: string;
    imageSrc: StaticImageData;
    alt: string;
    isSelected: boolean;
    onClick: (id: string) => void;
}

const ProductCard = ({
    title,
    prodId,
    description,
    imageSrc,
    alt,
    isSelected,
    onClick,
}: ProductCardProps) => {
  return (
    <div>
        <Card onClick={() => onClick(prodId)} 
            className={cn("w-[380px] cursor-pointer hover:scale-105 shadow-md", {
            "bg-blue-100": isSelected,
            "hover:bg-slate-100": !isSelected,
        })}>
            <CardHeader >
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent >
                <div className='p-4 pt-0'>
                    <Image src={imageSrc} alt={alt}/>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}

export default ProductCard