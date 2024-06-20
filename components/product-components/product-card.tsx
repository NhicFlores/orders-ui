import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from '../ui/card'
import Image from 'next/image';
import { Product, Shape } from '@/lib/definitions/order-definitions';

interface ProductCardProps {
    product: Product;
    isSelected: boolean;
    onClick: (id: string, configOption: string) => void;
}

const ProductCard = ({
    product: {id: prodId, name: title, description, imageSrc, alt},
    isSelected,
    onClick,
}: ProductCardProps) => {
  return (
    <div>
        <Card onClick={() => onClick(prodId, title)} 
            className={cn("cursor-pointer hover:scale-105 shadow-md", {
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