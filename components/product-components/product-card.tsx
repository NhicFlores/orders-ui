import { Card, CardContent, CardHeader, CardDescription } from '../ui/card'

const ProductCard = () => {
  return (
    <Card>
      <CardHeader>
        product name
      </CardHeader>
      <CardContent>
        <div>
            product image
        </div>
        <div>
            product
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCard


